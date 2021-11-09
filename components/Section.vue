<template>
	<section class="section" :style="{backgroundImage:getBackgroundImage()}">
		<div class="section__content">
			<div class="section__content__text-group">
				<h1>{{title}}</h1>
				<p>{{description}}</p>
			</div>
			<div class="section__content__button-group">
				<v-btn rounded>{{leftBtnText}}</v-btn>
				<v-btn rounded>{{rightBtnText}}</v-btn>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props:{
		title:{
			type:String,
			default: ''
		},
		description:{
			type:String,
			default: ''
		},
		backgroundImage:{
			type:String,
			required:true
		},
		leftBtnText:{
			type:String,
			default:''
		},
		rightBtnText:{
			type:String,
			default:''
		}
	},
	mounted(){
		const intersectionObserver = new IntersectionObserver((entries,observer)=>{
			entries.forEach(entry=>{
				if(!entry.isIntersecting) return;
				entry.target.style.visibility='visible'
				entry.target.classList.add('section__content-animation')
				observer.unobserve(entry.target)
			})
		},{
  		root:null,
			threshold:0.1
		})
		intersectionObserver.observe(this.$el)
	},
	methods:{
		getBackgroundImage(){
			return `url(${require(`~/assets/${this.backgroundImage}`)})`
		}
	}
}
</script>

<style lang="scss" scoped>
.section{ 
	visibility: hidden;
	z-index:-1;
	width:100vw;
	height:100vh;
	background-size:cover;
	background-position:center;
}
.section__content{
	display:flex;
	flex-direction:column;
	justify-content:space-between;
	align-items:center;
	height:100%;
	width:100%;
}
.section__content-animation{
	animation-duration:1.8s;
	animation-name:fadeIn;
}
@keyframes fadeIn {
	from{
		opacity:0;
		margin-top:50%;
	}
	to{
		opacity:1;
		margin-top:0%;
	}
}

.section__content__text-group{
	padding-top:15vh;
	text-align:center;
	font-size:35px;
	color:black;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen';
}

.section__content__button-group{
	margin-bottom:100px;
	display:flex;
	.v-btn{
		margin:10px;
	}
	@media screen and (max-width:768px) {
		flex-direction:column;
	}
	
}
</style>
