<template>
  <header class="Header">
    <NuxtLink to="/">
      <img class="PolzLogo" src="/polz-logo.png" />
    </NuxtLink>
    <ul class="Header_Items">
      <li
        class="Header_Item"
        v-for="(item, index) in items"
        :key="index"
        @click="item.onClick"
      >
        {{ item.text }}
      </li>
    </ul>
  </header>
</template>
<script>
export default {
  props: {
    items: {
      type: Object,
      default: () => {}
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
