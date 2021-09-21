<template>
  <header class="Header">
    <NuxtLink to="/">
      <img class="PolzLogo" src="/polz-logo.png" />
    </NuxtLink>
    <ul class="Header_Items">
      <li v-if="!isLoggedIn" class="Header_Item">
        <nuxt-link to="login">로그인</nuxt-link>
      </li>
      <li v-if="!isLoggedIn" class="Header_Item">
        <nuxt-link to="signup">회원가입</nuxt-link>
      </li>
      <li @click="logOut" v-if="isLoggedIn" class="Header_Item">
        <span>로그아웃</span>
      </li>
    </ul>
  </header>
</template>
<script>
import { getCookie, delCookie } from "~/utils/cookie";
export default {
  data() {
    return {
      isLoggedIn: false
    };
  },
  mounted() {
    this.isLoggedIn = !!getCookie("accessToken");
  },
  methods: {
    logOut() {
      delCookie("accessToken");
      this.isLoggedIn = false;
    }
  }
};
</script>
<style lang="scss" scoped>
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
</style>
