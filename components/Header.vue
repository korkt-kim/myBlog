<template>
  <v-app-bar 
      color="deep-grey accent-4"
      dark
      max-height="70"
  >
    <v-toolbar-title>
      <NuxtLink to="/" style="text-align: center;">
        <img class="PolzLogo" src="/polz-logo.png" />
      </NuxtLink>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="!$auth.loggedIn" class="Header_Item">
      <v-btn to="login">로그인</v-btn>
    </div>
    <v-menu v-else offset-y v-model="showUserMenu" style="max-width: 100px">
      <template v-slot:activator="{ on, attrs }">
        <v-img
              :src="picture"
              class="rounded-circle"
              max-width="50"
              max-height="50"
              v-bind="attrs"
              v-on="on"
              style="cursor:pointer"
            />
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in userMenuItems"
          :key="index"
          @click="item.action"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
import get from 'lodash.get'
export default {
  data() {
    return {
      showUserMenu:false,
      userMenuItems: [
        { title: '로그아웃',action: ()=>this.$auth.logout()},
      ],
    };
  },
  computed: {
    picture() {
      return (
        get(this.$auth.user, 'picture')  // OpenID
        // get(this.$auth.user, 'picture.data.url') || // Facebook graph API
        // get(this.$auth.user, 'avatar_url')
      ) // GitHub
    }
  },
  methods: {
    logout() {
      return this.$auth.logout();
    }
  }
};
</script>
<style lang="scss" scoped>
.PolzLogo {
  height: 30px;
  width: 90px;
  transform: rotateY(360deg);
  animation: turn 5s ease-out forwards 1s infinite;
}

@keyframes turn {
  60% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>
