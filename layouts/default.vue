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
    <Navigation @onClickAddPost="routeToPost" title="add post" :items="navigationItems"/>
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
export default {
  data() {
    return {
      navigationItems: [

      ]
    };
  },
  computed: {
    ...mapState("messageDialog", {
      isOpened: state => state.isOpened,
      title: state => state.title,
      content: state => state.content
    })
  },
  mounted(){
  },
  methods: {
    routeToPost() {
      this.inputDialogOpened = true;
    },
  }
};
</script>

<style scoped>
:root {
  --primary-color: #00c58e;
}
</style>
