<template>
  <v-app dark>
    <Header :navItems="navigation.map(item=>item.name)"/>
    <v-main>
        <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import {API} from "aws-amplify"
import {mapActions,mapGetters} from 'vuex';

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
    ...mapGetters({
      user:'awsCognito/user'
    }),
    isAdmin(){
      return this.$store.$auth.$state.user?.role=='ADMIN'
    },
  },
  methods: {
    ...mapActions('awsCognito', ['checkUser']),
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

<style>
:root {
  --primary-color: #00c58e;
}
@media (max-width:768px){
  html{
    font-size:8px;
  }
  h1{
    font-size:32px;
  }
  p{
    font-size:17px;
  }
}
</style>
