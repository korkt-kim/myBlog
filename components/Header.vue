<template>
  <header class="Header">
    <NuxtLink to="/">
      <img class="PolzLogo" src="/polz-logo.png" />
    </NuxtLink>
    <ul class="Header_Items">
      <li class="Header_Item" v-for="(item, index) in items" :key="index">
        <nuxt-link :to="item.to">{{ item.text }}</nuxt-link>
      </li>
    </ul>
  </header>
</template>
<script>
export default {
  data() {
    return {
      items: {
        signin: {
          text: "로그인",
          to: "login"
        },
        signup: {
          text: "회원가입",
          to: "signup"
        }
      }
    };
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
