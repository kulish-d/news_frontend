<template>
  <div>
    <Post
      v-for="post in allPosts"
      v-bind:key="post.id"
      :post="post"
    />
  </div>
</template>
      
<script>

import {mapGetters, mapActions} from 'vuex';

import Post from '../components/Post.vue';

export default {
  name: 'Posts',
  components: {
    Post,
  },
  computed: mapGetters(['allPosts']),
  methods: mapActions(['fetchPosts']),
  async mounted() {
    this.fetchPosts();
  }
}
</script>
  
<style>
  
</style>