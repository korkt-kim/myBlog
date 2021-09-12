<template>
  <v-navigation-drawer permanent absolute>
    <v-list-item v-for="item in personal" :key="item.title" link>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in technical" :key="item.title" link>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    personal: {
      type: Array,
      default: () => []
    },
    technical: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  }
};
</script>
