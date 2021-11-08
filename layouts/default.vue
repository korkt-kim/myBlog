<template>
  <v-app dark>
    <Header />
    <Navigation :items="navigation.map(item=>item.name)" @onClickItem="navigateToPostList">
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
    this.navigation = await this.getNavigation();
  },
  data() {
    return {
      navigation: [],
      rawCategories:[]
    };
  },
  computed: {
    isAdmin(){
      return this.$store.$auth.$state.user?.role=='ADMIN'
    },
  },

  methods: {
    async getNavigation(){
      const categories = await API.get('bloggerapi','/blog/category')
      categories.sort((item1,_)=>item1.parent ? 1 : -1)
      return categories.reduce((acc,item)=>{
        if(item.parent){
          const temp = acc.findIndex(parent=>parent.id===item.parent);
          acc[temp].subLinks.push(item)
        }else{
          acc.push({...item,subLinks:[]})
        }
        return acc;
      },[]);
    },
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
