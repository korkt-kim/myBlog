<template>
  <v-navigation-drawer app dark clipped flat>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item" link>
        <v-list-item-content>
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <slot name="bottom"></slot>
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
  },
  computed:{
    
  },
  methods: {}
};
</script>
