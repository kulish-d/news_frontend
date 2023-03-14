<template>
    <div>
      <li v-for="res in posts.data" :key="res.id">
        <!-- {{ post.id }}
         {{ post.text }} -->
         {{ res }}
         <!-- {{ res}} -->
      </li>
    </div>
    </template>
      
  <script>
  import axios from 'axios';

  export default {
    name: 'Post',
    components: {
      
    },
    data: () => {
    return {
      posts: []
    };
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8000/posts/')
      .then(response => {(this.posts = response); console.log(response)});
  }
    // props: ['data']
  }
  </script>
  
  <style>
    
  </style>