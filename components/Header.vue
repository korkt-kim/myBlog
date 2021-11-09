<template>
  <section>
    <header class="header">
      <NuxtLink to="/" >
        <img class="PolzLogo" src="/polz-logo.png" />
      </NuxtLink>
      
      <section class="header__header-item">
        <div v-if="!$localAuth.isAuthenticated">
          <v-btn to="login">로그인</v-btn>
          <v-btn to="register">회원가입</v-btn>
          <v-icon @click="toggleNav">mdi-menu</v-icon>
        </div>
        <div v-else>
          {{$localAuth.email}}
          <v-btn @click="$store.dispatch('localAuth/logout')">로그아웃</v-btn>
        </div>
      </section>
    </header>

    <nav class="nav" :isOpen="showNav? 'true':'false'">
      <div class="nav__close-button">
        <v-icon @click="toggleNav">mdi-close</v-icon>
      </div>
      
      <ul class="nav__list">
        <li class="nav__list__item" v-for="item in navItems" :key="item" link>
            {{ item }}          
        </li>
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
import get from 'lodash.get'
export default {
  props:{
    navItems: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      showUserMenu:false,
      showNav:false,
      userMenuItems: [
        { title: '로그아웃',action: ()=>this.$auth.logout()},
      ],
    };
  },
  computed: {
    picture() {
      return (
        get(this.$auth.user, 'picture')  // OpenID
        // get(this.$auth.user, 'picture.data.url') || // Facebook graph API
        // get(this.$auth.user, 'avatar_url')
      ) // GitHub
    }
  },
  methods: {
    logout() {
      return this.$auth.logout();
    },
    toggleNav(){
      this.showNav=!this.showNav;
    }
  }
};
</script>
<style lang="scss" scoped>
section{
  overflow:auto;
}
.header{
  position:fixed;
  padding:0 1em;
  z-index:100;
  display:flex;
  width:100%;
  min-height:64px;
  justify-content:space-between;
  align-items:center;
  background:black;
  .link-main{
    text-align: center;
  }
  .header__header-item{
    padding-right:0.5em;
  }
}

.PolzLogo {
  height: 30px;
  width: 90px;
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
  position:fixed;
  top:0;
  bottom:0;
  right:0;
  z-index:110;
  background-color:black;
  width:300px;
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
      font-size:35px !important;
    }
  }
  
  .nav__list{
    overflow:auto;
    list-style:none;
    .nav__list__item{
      font-size:19.2px;
      padding: 8px 2px;
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
}
</style>
