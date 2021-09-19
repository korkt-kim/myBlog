<template>
  <v-app dark>
    <LazyHeader />
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
  }
};
</script>

<style>
:root {
  --primary-color: #00c58e;
}
</style>
