<template>
  <v-col>
    <v-card elevation="10" outlined shaped>
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-subtitle>{{post.author}}</v-card-subtitle>
      <v-card-text>{{ post.text }}</v-card-text>
      <div v-if="post.tags">
        <PostTag
          :tag="tag.text"
          v-bind:key="tag.id"
          v-for="tag in post.tags"
        />
      </div>
    </v-card>
  </v-col>
</template>
    
<script>
import PostTag from '../components/PostTag.vue'
export default {
  name: 'Post',
  components: {
    PostTag,
  },
  props: ['post'],
}
</script>

<style>
  
</style>