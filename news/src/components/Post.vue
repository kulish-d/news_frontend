<template>
  <v-col>
    <v-card elevation="10" outlined shaped>
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-subtitle>{{post.author}}</v-card-subtitle>
      <v-card-text>{{ post.text }}</v-card-text>
    </v-card>
  </v-col>
</template>
    
<script>
// import vuetify from '@/plugins/vuetify';
export default {
  name: 'Post',
  components: {
    
  },
  props: ['post'],
}
</script>

<style>
  
</style>