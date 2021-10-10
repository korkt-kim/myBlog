<template>
  <v-navigation-drawer app dark clipped flat>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-if="isAdmin" v-slot:append>
      <div class="pa-2">
        <v-btn block @click="onClickAddPost">
          {{title}}
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    title: {
      type: String
    }
  },
  computed:{
    isAdmin(){
      return this.$store.$auth.$state.user?.role=='ADMIN'
    },
  },
  methods: {
    onClickAddPost() {
      this.$emit("onClickAddPost");
    }
  }
};
</script>
