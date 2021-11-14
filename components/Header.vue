<template>
  <section>
    <header class="header">
      <NuxtLink to="/" >
        <img class="PolzLogo" src="/polz-logo.png" />
      </NuxtLink>
      
      <div class="header__header-item">
        <span v-if="!user">
          <NuxtLink to="/login"><v-btn>로그인</v-btn></NuxtLink>
          <NuxtLink to="/signup"><v-btn>회원가입</v-btn></NuxtLink>
        </span>
        <span v-else>
          <span style="margin-right:1rem;">안녕하세요 {{user.name}} 님!</span>
          <v-btn @click="logout">로그아웃</v-btn>
        </span>
        <span><v-icon @click="toggleNav">mdi-menu</v-icon></span>
      </div>
    </header>

    <nav ref="nav" class="nav" :isOpen="showNav? 'true':'false'">
      <div class="nav__close-button">
        <v-icon @click="toggleNav">mdi-close</v-icon>
      </div>
      
      <ul class="nav__list">
        <NuxtLink class="nav__list__item" v-for="category in categories"  :key="category.id" :to="{path:'/category/'+category.id,params:{categoryTitle:category.name}}" >
            {{ category.name }}       
        </NuxtLink>   
      </ul>

      <div class="nav__post" >
        <v-btn block>
          add post
        </v-btn>
      </div>
    </nav>
  </section>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
export default {
  props:{
    categories: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      showNav:false,
    };
  },
  computed: {
    ...mapGetters({
      user:'awsCognito/user'
    })
  },
  methods: {
    ...mapActions('awsCognito',['logout']),
    toggleNav(){
      this.showNav=!this.showNav;
      document.documentElement.style.overflow=this.showNav ? 'hidden' :'auto';
    },
  }
};
</script>
<style lang="scss" scoped>
.header{
  position:fixed;
  padding:0 1em;
  z-index:100;
  display:flex;
  width:100%;
  min-height:4rem;
  justify-content:space-between;
  align-items:center;
  background:black;
  .link-main{
    text-align: center;
  }
  .header__header-item{ 
    .v-btn{
      height:2.4rem;
      min-height:24px;
    }
    .v-icon{
      font-size:2.4rem;
    }
  }
}

.PolzLogo {
  height: 2rem;
  width: 5.2rem;
  transform: rotateY(360deg);
  animation: turn 5s ease-out forwards 1s infinite;
}

@keyframes turn {
  60% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}

.nav{
  overflow-y:auto;
  overflow-x:hidden;
  position:fixed;
  top:0;
  bottom:0;
  right:0;
  z-index:110;
  background-color:black;
  width:20rem;
  transition: transform 0.8s ease-in;
  &[isOpen=true]{
    transform: translateX(0%);
  }
  &[isOpen=false]{
    transform:translateX(100%);
  }
  
  .nav__close-button{
    padding:20px 20px;
    width:100%;
    display:flex;
    justify-content:flex-end;
    background:black;
    .mdi-close{
      font-size:2rem !important;
    }
  }
  
  .nav__list{
    list-style:none;
    .nav__list__item{
      width:100%;
      display:block;
      font-size:1.1rem;
      padding: 1rem ;
      cursor:pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen';
      &:hover{
        background: grey; 
      }
      &:active{
        animation: vibrate 75ms linear 3 forwards;
        @keyframes vibrate{
          0% {
            transform: translateX(-1px) translateY(1px);
          }
          100% {
            transform: translateX(1px) translateY(-2px);
          }
        }
      }
    }
  }
  
  .nav__post{
    bottom:0px;
    margin:15px 10px;
  }

  a{
    text-decoration:none;
    color: white;
  }
}
</style>
