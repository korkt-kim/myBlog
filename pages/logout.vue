<template>
  <div :style="{ 'text-align': 'center' }">
    <v-alert show variant="info"> 로그아웃 되었습니다 </v-alert>
  </div>
</template>

<script>
export default {
  layout: "auth",
  mounted(){
    setTimeout(()=>{
      this.$router.push('/');
    },1000)
    
  }
};
</script>
