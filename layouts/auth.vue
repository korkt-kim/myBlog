<template>
  <v-app dark>
    <MessageDialog
      :isOpened="isOpened"
      :title="title"
      :content="content"
      v-on:clickOK="closeDialog"
    ></MessageDialog>
    <Header />
    <nuxt />
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapState("dialog", {
      isOpened: state => state.isOpened,
      title: state => state.title,
      content: state => state.content
    })
  },
  methods: {
    ...mapMutations({
      closeDialog: "dialog/closeDialog"
    })
  }
};
</script>
