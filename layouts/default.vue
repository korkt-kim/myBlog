<template>
  <v-app dark>
    <!-- <MessageDialog :isOpened="isOpened">
      <template v-slot:title>
        {{ title }}
      </template>
      <template v-slot:main>
        {{ content }}
      </template>
    </MessageDialog> -->
    <Header />
    <!-- <Navigation :items="navigationItems" @onClickItem="navigateToPostList">
      <template v-slot:bottom>
        <div class="pa-2" v-if="isAdmin" >
          <v-btn block @click="navigateToPost">
            add post
          </v-btn>
        </div>
      </template>
    </Navigation> -->
    <v-main>
      <v-container fluid>
        <Nuxt />   
      </v-container>
    </v-main>
    <!-- <LazyFooter /> -->
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import {getAllPosts} from "~/apis/blog"

export default {
  async fetch(){
    // const res = await getAllPosts({$axios:this.$axios});
    this.navigationItems = []
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
  },
  methods: {
    navigateToPost() {
      alert("asdf")
      this.inputDialogOpened = true;
    },
    navigateToPostList(item){
      this.$router.push(`/postlist/${item}`)
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #00c58e;
}
</style>
