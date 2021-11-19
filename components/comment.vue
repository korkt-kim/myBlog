<template>
  <div id="comment">
    <div class="comment__title">Comment</div>
    <div class="comment__list" v-for="(comment,index) in comments" :key="index">
      <div class="comment__list__header"><span class="comment__list__header__user">{{comment.userName}}</span><span class="comment__list__header__date">{{new Date(comment.updatedAt).toLocaleString()}}</span></div>
      <div class="comment__list__content">{{comment.comment}}</div>
    </div>
    <textarea class="comment-input" v-model="commentInput" :placeholder="placeholder"></textarea>
    <v-btn type="button" @click.prevent="postComment" :disabled="!this.$store.getters['awsCognito/user']">Register</v-btn>
    
  </div>
</template>
<script>

export default {
  name: 'App',
  props:{
    comments:{
      type:Array,
      default: () => ([])
    },
    onClickRegister:{
      type:Function,
      default: ()=>{}
    },
    refreshCommentList:{
      type:Function
    }
  },
  data(){
    return{
      commentInput:''
    }
  },
  computed:{
    placeholder(){
      return this.$store.getters['awsCognito/user'] ? `` : `Please login to post comment`;
    }
  },
  methods:{
    async postComment(){
      await this.onClickRegister(this.commentInput);
      this.commentInput='';
      await this.refreshCommentList();
    }
  }
}
</script>
<style lang="scss" scoped>
#comment{
  width:70%;
  margin-top:1rem;
  @media (max-width:768px){
    width:100%;
    margin-top:1rem;
    padding : 0 1rem;
  }
  .comment__title{
    color:white;
    font-size:1.35rem;
    border-bottom:1px solid grey;
    padding-bottom:1.5rem;
  }
  .comment__list{
    padding:2rem 0;
    border-bottom: 1px solid grey;
    &:last-of-type{
      border-bottom:0;
    }
    .comment__list__header{
      padding-bottom:1rem;
      .comment__list__header__user{
        color:white;
        &::after{
          content:"";
          font-size:2px;
          border-right: 1px solid grey;
          padding-left: 1rem;
          margin-right:1rem;
        }
        
      }
      .comment__list__header__date{
        font-size:0.8rem;
        color:white;
      }
    }
    .comment__list__content{
      color:gainsboro;
    } 
  }
}

.comment-input{
  color:white;
  margin-top:1rem;
  border:lightgray 0.2rem solid;
  width:100%;
  overflow-y:auto;
  min-height:7rem;
  &:focus{
    border:lightgreen 0.2rem solid;
    outline: none;
  }
  .v-btn{
    height:2.4rem;
    min-height:24px;
  }
}

</style>
