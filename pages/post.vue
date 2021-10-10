<template>
  <div>
      <v-text-field label="title"></v-text-field>
      <v-combobox label="category" v-model="category" :items="items"></v-combobox>
  </div>
</template>

<script>
export default {
    data(){
        return{
            category:null,
            items:[]
        }
    }
}
</script>

<style>
    
</style>