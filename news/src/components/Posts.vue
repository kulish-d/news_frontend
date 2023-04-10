<template>
  <div>
    <Post
      v-for="post in filteredPosts"
      v-bind:key="post.id"
      :post="post"
    />
  </div>
</template>
      
<script>

import Post from '../components/Post.vue';

export default {
  name: 'Posts',
  components: {
    Post,
  },
  props: ['filteredPosts']
}
</script>
  
<style>
  
</style>