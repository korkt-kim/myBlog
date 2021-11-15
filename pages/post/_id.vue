<template>
  <section id="section">
		
		<div class="post">
			<h1 class="post__title">{{title}}</h1>

			<div class="post__content" v-html="content"/>
		</div>
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
		}
	},
	async fetch(){
		if(this.$nuxt?.$loading?.start){
			this.$nuxt.$loading.start();
		}
		this.postId = this.$route.params.id;
		const {title,content,categoryId,date} = await API.get('blogapi',`/blog/post/${this.postId}`)
		this.title = title;
		this.content = content;
		this.date = date;
		if(this.$nuxt?.$loading?.start){
			this.$nuxt.$loading.finish()
		}
	},
	
}
</script>

<style lang="scss">
#section{
	display:flex;
	align-items: center;
	flex-direction: column;
	color:black;
	margin-top:5rem;
	.post{
		padding:1.5rem;
		background-color:whitesmoke;	
		width:70%;
		.post__title{
			padding-bottom:1rem;
			font-size:2rem;
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
			pre{
				background: rgb(238,238,238);
				border: 1px solid #ddd;
				border-left: 3px solid #f36d33;
				color: #666;
				page-break-inside: avoid;
				font-family: monospace;
				font-size: 15px;
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