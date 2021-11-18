/* Amplify Params - DO NOT EDIT
	AUTH_BLOG87BED555_USERPOOLID
	ENV
	REGION
	STORAGE_COMMENTTABLE_ARN
	STORAGE_COMMENTTABLE_NAME
	STORAGE_COMMENTTABLE_STREAMARN
Amplify Params - DO NOT EDIT *//*
Use the following code to retrieve configured secrets from SSM:
const aws = require('aws-sdk');
const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["ACCESS_TOKEN"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();
Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const aws = require('aws-sdk');
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios');
const {v4: uuidv4} = require('uuid');

const dynamodb = new aws.DynamoDB.DocumentClient({
  region: 'us-east-2'
});
const tableName = 'commenttable-dev'


// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
}); 

const getUser= req =>{
  try{
    const reqContext = req.apiGateway.event.requestContext;
    const authProvider = reqContext?.authorizer?.claims?.sub ? {sub:reqContext.authorizer.claims.sub,name:reqContext.authorizer.claims.name} : 'unauthorized';
    return authProvider;
  }catch(e){
    return 'Unauthorized';
  }
}

//카테고리 읽기
app.get('/blog/category', async(req,res)=>{
  const {Parameter} = await (new aws.SSM()).getParameter({
    Name:process.env.ACCESS_TOKEN,
    WithDecryption: true
  })
  .promise();

  const {data:{tistory:{item:{categories}}}} = await axios.get(`https://www.tistory.com/apis/category/list?access_token=${Parameter.Value}&output=json&blogName=zakelstorm`)
  res.json(categories)
})

//글 목록
app.get('/blog/post',async (req,res)=>{
  const {categoryId,page} = req.query;

   const {Parameter} = await (new aws.SSM()).getParameter({
    Name:process.env.ACCESS_TOKEN,
    WithDecryption: true
  })
  .promise();
  const {data:{tistory:{item:{count,totalCount,posts}}}} = await axios.get(`https://www.tistory.com/apis/post/list?access_token=${Parameter.Value}&categoryId=${categoryId}&output=json&blogName=zakelstorm&page=${page}&count=5`)
  res.json({count,totalCount,posts})
})

//글 읽기
app.get('/blog/post/:postId',async (req,res)=>{
  const {postId} = req.params;

  const {Parameter} = await (new aws.SSM()).getParameter({
    Name:process.env.ACCESS_TOKEN,
    WithDecryption: true
  })
  .promise();

  const {data:{tistory:{item:{title,content,categoryId,visibility,tags,date}}}} = await axios.get(`https://www.tistory.com/apis/post/read?access_token=${Parameter.Value}&blogName=zakelstorm&postId=${postId}&output=json`);
  res.json({title,content,categoryId,visibility,tags,date})
})

//글작성
app.post(`/blog/post`,async (req,res)=>{
  const {title,content,visibility,categoryId,published,tag} = req.body

  const {Parameter} = await (new aws.SSM()).getParameter({
    Name:process.env.ACCESS_TOKEN,
    WithDecryption: true
  })
  .promise();

  const {data:{tistory:{status,postId,url}}} = await axios.get(`https://www.tistory.com/apis/post/write?access_token=${Parameter.Value}&output=json&blogName=zakelstorm
  &title=${title}
  &content=${content}
  &visibility=${visibility}
  &category=${categoryId}
  &published=${published}
  &tag=${tag}`);
  res.json({status,postId,url})
})

//코멘트 읽기
app.get(`/blog/comment`,async (req,res)=>{
  const {postId} = req.query;
  const params = {
    FilterExpression: "postId = :postId",
    ExpressionAttributeValues: {
          ":postId": postId,
    },
    TableName:tableName,
    ScanIndexForward :true,
  }
  try{
    const result = await dynamodb.scan(params).promise()
    res.json({result})
  }catch(e){
    return e;
  }
  
})
//코멘트 작성
app.post('/blog/comment',async (req,res)=>{
  const timestamp = new Date().getTime();
  const {sub,name} = getUser(req);

  const params = {
    TableName:tableName,
    Item:{
      ...req.body,
      id:uuidv4(),
      createdAt:timestamp,
      updatedAt:timestamp,
      userSub:sub,
      userName:name
    }
  }
  dynamodb.put(params,(error,result)=>{
    if(error){
      res.json({
        statusCode:500,error:{
          message:error.message
        }
      });
    }else{
      res.json({statusCode:200,url:req.url,body:JSON.stringify(params.Item)})
    }
  })
})
  
module.exports = app