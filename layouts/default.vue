<template>
  <v-app dark>
    <Header :items="headerItems" />
    <v-main>
      <v-container fluid>
        <Navigation
          :personal="navigationItems.personal"
          :technical="navigationItems.technical"
        />
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      headerItems: {
        signin: {
          text: "로그인",
          onClick: () => {
            console.log("asdf");
          }
        },
        signup: {
          text: "회원가입",
          onClick: () => {
            console.log("zxcv");
          }
        }
      },
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
