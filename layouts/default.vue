<template>
  <v-app dark>
    <InputDialog
      id="addCategory"
      :isOpened="inputDialogOpened"
      @onClickSubmit="closeInputDialog"
      @onClickOutside="closeInputDialog"
    >
      <template v-slot:title>
        Add Category
      </template>
      <template v-slot:main>
        <v-text-field label="category name"></v-text-field>
      </template>
    </InputDialog>
    <MessageDialog :isOpened="isOpened">
      <template v-slot:title>
        {{ title }}
      </template>
      <template v-slot:main>
        {{ content }}
      </template>
    </MessageDialog>
    <Header />
    <Navigation @onClickAddCategory="openInputDialog" />
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
      inputDialogOpened: false,
      navigationItems: {
        personal: [
          // { title: "프로필", icon: "mdi-view-dashboard" },
          // { title: "Books" }
        ],
        technical: [
          // { title: "HTTP" },
          // { title: "HTML" },
          // { title: "JavaScript" },
          // { title: "CSS" },
          // { title: "VueJS" },
          // { title: "React" },
          // { title: "Webpack" },
          // { title: "JEST" },
          // { title: "Security&Errors" },
          // { title: "Git" },
          // { title: "Design Patterns" },
          // { title: "Regex" },
          // { title: "Spring" },
          // { title: "Browser" },
          // { title: "기타" },
          // { title: "오답노트" }
        ]
      }
    };
  },
  computed: {
    ...mapState("messageDialog", {
      isOpened: state => state.isOpened,
      title: state => state.title,
      content: state => state.content
    })
  },
  methods: {
    openInputDialog() {
      this.inputDialogOpened = true;
    },
    closeInputDialog() {
      this.inputDialogOpened = false;
    },
    makeCategory() {}
  }
};
</script>

<style scoped>
:root {
  --primary-color: #00c58e;
}
</style>
