<template>
	<section id="category-id">
		<h1 class="title">{{categoryTitle}}</h1>
		<Table 
			:items="postList"
			:totalCount="totalCount"
			@movePage="getPostListByCategoryId"
			@clickItem="showPostDetail"
		></Table>
	</section>
</template>

<script>
import {API} from 'aws-amplify';
import {mapGetters} from 'vuex';

export default {
    data(){
			return{
				categoryTitle:'',
				postList:[],
				totalCount:0,
				categoryId:0,
			}
    },
    computed: {
			...mapGetters({
				categories:'blog/categories'
			}),
    },
    async fetch(){
			this.categoryId = this.$route.params.id;
			this.categoryTitle = this.categories.find(category=>category.id===this.categoryId).name;
			await this.getPostListByCategoryId(1);
    },
		methods:{
			async getPostListByCategoryId(currentPage){
				if(this.$nuxt?.$loading?.start){
					this.$nuxt.$loading.start();
				}
				const temp =  await API.get('bloggerapi',`/blog/post?categoryId=${this.categoryId}&page=${currentPage}`);
				this.postList = temp.posts;
				this.totalCount = Number(temp.totalCount);
				if(this.$nuxt?.$loading?.start){
					this.$nuxt.$loading.finish()
				}
			},
			showPostDetail(postId){
				this.$router.push(`/post/${postId}`);
			}
		}
}
</script>

<style lang="scss" scoped>
	#category-id{
		margin-top:5rem;
		display:flex;
		align-items: center;
		flex-direction:column;
	}
	.title{
		text-align:center;
	}

</style>