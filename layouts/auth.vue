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
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("messageDialog", {
      isOpened: state => state.isOpened,
      title: state => state.title,
      content: state => state.content
    })
  }
};
</script>
