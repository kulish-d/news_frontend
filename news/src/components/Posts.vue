<template>
  <div>
    <Post
      v-for="post in posts"
      v-bind:key="post.id"
      :post="post"
    />
  </div>
</template>
      
<script>
import axios from 'axios';
import Post from '../components/Post.vue';
export default {
  name: 'Posts',
  components: {
    Post,
  },
  data: () => {
  return {
    posts: []
  };
},
mounted() {
  axios
    .get('http://127.0.0.1:8000/posts/')
    .then(response => {(this.posts = response.data); console.log(this.posts)});
},
}
</script>
  
<style>
  
</style>