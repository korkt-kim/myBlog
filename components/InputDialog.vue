<template>
  <v-dialog v-model="isOpened" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        <slot name="title"> </slot>
      </v-card-title>
      <v-list dense nav>
        <v-list-item>
          <v-list-item-content>
            <slot name="main"></slot>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card-actions class="justify-end">
        <v-btn text @click="onClickSubmit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpened: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClickSubmit() {
      this.$emit("onClickSubmit");
    }
  }
};
</script>
