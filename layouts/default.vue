<template>
  <v-app dark>
    <Header :categories="navigation"/>
    <v-main>
        <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';

export default {
  async fetch() {
    this.navigation = await this.getNavigation();
  },
  data() {
    return {
      navigation: [],
    };
  },
  computed: {
    ...mapGetters({
      user:'awsCognito/user',
      categories:'blog/categories'
    }),
  },
  mounted(){
    this.checkUser();
  },
  methods: {
    ...mapActions('awsCognito',['checkUser']),
    ...mapActions('blog',['getCategories']),
    async getNavigation(){
      await this.getCategories();
      return this.categories.reduce((acc,item)=>{
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
