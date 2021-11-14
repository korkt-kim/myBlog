<template>
	<div id="table-group">
		<div id="table">
			<div class="table__summary" v-for="item in items" :key="item.id">
				<div class="table__summary__header">
					<h3>{{item.title}}</h3>
					<small>{{item.date}}</small>
				</div>
			</div>
			<small></small>
		</div>
		<div class="pagination">
			<span v-if="showPrevButton" class="prev-page" @click="onClickPrevButton"></span>
			<span v-for="(_,index) in (lastPaginationIndex-firstPaginationIndex+1)" :key="index" @click="onClickPagination(index+1)" :class="currentPage%5==index+1 ? 'current-page':''">
				{{firstPaginationIndex+index}}
			</span>
			<span v-if="showNextButton" class="next-page" @click="onClickNextButton"></span>
		</div>
	</div>
</template>

<script>
const PAGE_SIZE=5
export default {
	props:{
		items:{
			type:Array,
			default:()=>[]
		},
		totalCount:{
			type:Number,
			default:0,
		},
	},
	data(){
		return{
			currentPage:1
		}
	},
	computed:{
		showNextButton(){
			return this.lastPaginationIndex !== Math.ceil(this.totalCount/PAGE_SIZE);
		},
		showPrevButton(){
			return this.firstPaginationIndex !== 1;
		},
		lastPaginationIndex(){
			const limit = Math.floor(this.totalCount/PAGE_SIZE)+1;
			return Math.min(limit,(Math.floor((this.currentPage-1)/PAGE_SIZE))*PAGE_SIZE+PAGE_SIZE);
		},
		firstPaginationIndex(){
			return Math.floor((this.currentPage-1)/PAGE_SIZE)*PAGE_SIZE+1;
		}
	},
	methods:{
		onClickPrevButton(){
			this.currentPage = (Math.floor(this.currentPage/PAGE_SIZE)-1)*PAGE_SIZE+1
			this.$emit("movePage",this.currentPage)
		},
		onClickNextButton(){
			this.currentPage = Math.floor(this.currentPage/PAGE_SIZE)*PAGE_SIZE+1
			this.$emit("movePage", this.currentPage)
		},
		onClickPagination(page){
			this.currentPage = page;
			this.$emit("movePage",page)
		}
	}
}
</script>

<style lang="scss" scoped>
	#table-group{
		width:50%;
		display:flex;
		flex-direction: column;
	}
	#table{
		
		.table__summary{
			border-bottom:1px solid grey;
			padding:2rem 0;
			cursor: pointer;
			.table__summary__header{
				display:flex;
				justify-content: space-between;
				align-items: baseline;
				padding:0.5rem;
			}
		}
	}
	.pagination{
			align-self: center;
			margin-top:1rem;
			span {
				display: inline-block;
				padding: 8px 12px;
				border: 1px solid #ccc;
				margin: 0 4px;
				border-radius: 4px;
				cursor: pointer;
				&.current-page {
					background-color: #333;
					color: #fff;
				}
				&.prev-page::before {
					content: '◀️'
				}
				&.next-page::before {
					content: '▶️'
				}
			}
		}
</style>