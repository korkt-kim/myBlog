<template>
  <v-dialog v-model="isOpened" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        <slot name="title">
          {{ title }}
        </slot>
      </v-card-title>

      <v-card-text>
        <slot name="main">
          {{ content }}
        </slot>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="onClickOK">
          <slot name="ok">
            OK
          </slot>
        </v-btn>
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
    },
    title: {
      type: String
    },
    content: {
      thpe: String
    }
  },
  methods: {
    onClickOK() {
      this.$emit("clickOK");
    }
  }
};
</script>
