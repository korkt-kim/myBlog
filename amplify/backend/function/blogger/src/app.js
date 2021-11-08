/*
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
app.get('/blog/:categoryId/post',async (req,res)=>{
  const {categoryId} = req.params;
  const {page} = req.query;

   const {Parameter} = await (new aws.SSM()).getParameter({
    Name:process.env.ACCESS_TOKEN,
    WithDecryption: true
  })
  .promise();
  const {data:{tistory:{item:{count,totalCount,posts}}}} = await axios.get(`https://www.tistory.com/apis/post/list?access_token=${Parameter.Value}&categoryId=${categoryId}&output=json&blogName=zakelstorm&page=${page}`)
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
app.post(`blog/post`,async (req,res)=>{
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


/**********************
 * Example get method *
 **********************/

app.get('/item', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/item', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
