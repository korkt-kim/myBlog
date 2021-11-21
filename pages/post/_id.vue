<template>
  <section id="section">
		<div class="title">{{title}}</div>
		<div class="post">
			<div class="post__content" v-html="content"/>
		</div>
		<Comment :comments="comments" :onClickRegister="registerComment" :refreshCommentList="getComments"></Comment>
	</section>
</template>

<script>
import {API} from 'aws-amplify'

export default {
	
	data(){
		return{
			postId:0,
			title:'',
			content:'',
			date:null,
			comments:[],
		}
	},
	async mounted(){
		if(this.$nuxt?.$loading?.start){
			this.$nuxt.$loading.start();
		}
		this.postId = this.$route.params.id;
		const {title,content,categoryId,date} = await API.get('blogapi',`/blog/post/${this.postId}`)
		this.title = title;
		this.content = content;
		this.date = date;
		await this.getComments();
		if(this.$nuxt?.$loading?.finish){
			this.$nuxt.$loading.finish()
		}
	},
	methods:{
		async getComments(){
			const headers={
				headers:{
					"Authorization": `Bearer ${this.$store.state.awsCognito.user?.signInUserSession?.idToken?.jwtToken}`
				}
			}
			const {result:{Count,Items}} = await API.get('blogapi',`/blog/comment?postId=${this.postId}`,headers);
			this.comments = Items;
		},
		async registerComment(comment){
			const request = {
				body:{
					comment,
					postId:this.postId
				},
				headers:{
					"Content-Type": "application/json; charset=utf-8",
					"Accept": "application/json",
					"Authorization": `Bearer ${this.$store.state.awsCognito.user?.signInUserSession?.idToken?.jwtToken}`
				}
			};
			
			try{
				const result = await API.post('blogapi','/blog/comment',request)
				console.log(result);
			}catch(e){
				console.error(e);
				alert(e.message);
			}
			
		}
	}
}
</script>

<style lang="scss">
#section{
	display:flex;
	align-items: center;
	flex-direction: column;
	color:black;
	margin-top:5rem;
	.title{
		padding-bottom:1rem;
		font-size:2rem !important;
		color: white;
		margin-bottom:2rem;
	}
	.post{
		padding:1.5rem;
		background-color:whitesmoke;	
		width:70%;
		@media (max-width:768px) {
			width:100%;
		}
		
		.post__content{
			overflow-x:auto;
			h3{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 5rem;
				margin-bottom: 2rem;
				padding: 0.5em 0;
				letter-spacing: -.02rem;
				line-height: 2.625rem;
				font-size: 1.5rem;
				font-weight: 600;
				color: #2e2e2e;
				&::before{
					content: "";
					text-align: left;
					-webkit-box-flex: 1;
					-ms-flex-positive: 1;
					flex-grow: 1;
					margin-right: 0.5rem;
					border-bottom: 1px solid lightgrey;
				}
				&::after{
					content: "";
					text-align: right;
					-webkit-box-flex: 1;
					-ms-flex-positive: 1;
					flex-grow: 1;
					margin-left: 0.5rem;
					border-bottom: 1px solid lightgrey;
				}
			}
			img{
				height: auto;
    			max-width: 100%;
			}
			pre{
				background: rgb(238,238,238);
				border: 1px solid #ddd;
				border-left: 3px solid #f36d33;
				color: #666;
				page-break-inside: avoid;
				font-family: monospace;
				font-size: 1rem;
				line-height: 1.6;
				margin-bottom: 1.6em;
				max-width: 100%;
				overflow: auto;
				padding: 1em 1.5em;
				display: block;
				word-wrap: break-word;
			}
		}
		
		
	}
}

</style>