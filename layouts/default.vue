<template>
  <v-app dark>
    <Header />
    <Navigation :items="navigationItems" @onClickItem="navigateToPostList">
      <template v-slot:bottom>
        <div class="pa-2" v-if="isAdmin" >
          <v-btn block @click="navigateToPost">
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
    <Footer />
  </v-app>
</template>

<script>
import {API} from "aws-amplify"

export default {
  async fetch() {
    const {categories} = await API.get('bloggerapi','/blog/categories')
    this.navigationItems = categories;
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
    // ...mapState("messageDialog", {
    //   isOpened: state => state.isOpened,
    //   title: state => state.title,
    //   content: state => state.content
    // })
  },
  methods: {
    navigateToPost() {
      this.inputDialogOpened = true;
    },
    navigateToPostList(category){
      this.$router.push(`/postlist/${category}`)
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #00c58e;
}
</style>
