<template>
  <div v-if="loading" class="loading-page">
    <img src="/loading.gif" class="loading" />
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.loading-page {
  z-index: 2;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.9);
  img{
    width:19rem;
  }
  .loading {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
