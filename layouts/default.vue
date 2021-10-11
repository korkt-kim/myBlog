<template>
  <v-app dark>
    <MessageDialog :isOpened="isOpened">
      <template v-slot:title>
        {{ title }}
      </template>
      <template v-slot:main>
        {{ content }}
      </template>
    </MessageDialog>
    <Header />
    <Navigation :items="navigationItems">
      <template v-slot:bottom>
        <div class="pa-2" v-if="isAdmin" >
          <v-btn block @click="routeToPost">
            add post
          </v-btn>
        </div>
      </template>
    </Navigation>
    <v-main>
      <v-container fluid>
        <Nuxt />   
      </v-container>
    </v-main>
    <LazyFooter />
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import {getAllPosts} from "~/apis/blog"

export default {
  async fetch(){
    const res = await getAllPosts({$axios:this.$axios});
    this.navigationItems = res.reduce((acc,item)=>{
      acc = Array.from(new Set([...acc,...item.labels]));
      return acc
    },[])
  },
  data() {
    return {
      navigationItems: []
    };
  },
  computed: {
    isAdmin(){
      return this.$store.$auth.$state.user?.role=='ADMIN'
    },
    ...mapState("messageDialog", {
      isOpened: state => state.isOpened,
      title: state => state.title,
      content: state => state.content
    })
  },
  mounted(){
    console.log(this.navigationItems)
  },
  methods: {
    routeToPost() {
      alert("asdf")
      this.inputDialogOpened = true;
    },
    asdf(res){
      console.log(res)
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #00c58e;
}
</style>
