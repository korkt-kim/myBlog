<template>
  <div>
      <v-data-table :headers="headers"
      :items="postList"
      :header-props="{
            disableSort: true,
        }"
      >   
        <template v-slot:item.updated="{ item }">
            <span>{{ new Date(item.updated).toLocaleString() }}</span>
        </template>
      </v-data-table>
  </div>
</template>

<script>
import {getPostsByCategory} from '~/apis/blog'
export default {
    data(){
        return{
            postList:[],
            label:null,
            nextPageToken:null,
            prevPageToken:null
        }
    },
    async asyncData({$axios,params}){
        const label = params.label
        const postResponse = await getPostsByCategory({$axios},label);
        return {
            label,
            postResponse
        }
    },
    mounted(){
        const{items,nextPageToken} =  this.postResponse;
        this.postList = items;
        this.prevPageToken = this.nextPageToken;
        this.nextPageToken = nextPageToken;
    },
    computed:{
        headers(){
            return[
                {
                    text: 'Title',
                    align: 'start',
                    value: 'title',
                    width:'85%'
                },
                {
                    text:'Date',
                    value:'updated'
                }

            ]
        }
    },
}
</script>

<style>
    
</style>