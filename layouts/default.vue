<template>
  <v-app dark>
    <MessageDialog
      :isOpened="isOpened"
      :title="title"
      :content="content"
      v-on:clickOK="closeDialog"
    ></MessageDialog>
    <Header />
    <v-main>
      <v-container fluid>
        <Navigation
          :personal="navigationItems.personal"
          :technical="navigationItems.technical"
        />
        <Nuxt />
      </v-container>
    </v-main>
    <LazyFooter />
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      navigationItems: {
        personal: [
          { title: "프로필", icon: "mdi-view-dashboard" },
          { title: "Books" }
        ],
        technical: [
          { title: "HTTP" },
          { title: "HTML" },
          { title: "JavaScript" },
          { title: "CSS" },
          { title: "VueJS" },
          { title: "React" },
          { title: "Webpack" },
          { title: "JEST" },
          { title: "Security&Errors" },
          { title: "Git" },
          { title: "Design Patterns" },
          { title: "Regex" },
          { title: "Spring" },
          { title: "Browser" },
          { title: "기타" },
          { title: "오답노트" }
        ]
      }
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

<style>
:root {
  --primary-color: #00c58e;
}
</style>
