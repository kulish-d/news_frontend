<template>
  <div>
    <Post
      v-for="post in posts"
      v-bind:key="post.id"
      :post="post"
    />
    <div class="text-center" id="pagination-bar">
      <v-pagination
        v-model="currentPage"
        :total-visible="5"
        :length="totalPages"
        circle
      >
      </v-pagination>
  </div>
  </div>
</template>
      
<script>

import Post from '../components/Post.vue';

import { POSTS_ON_PAGE } from '../../constants';
import { mapGetters } from 'vuex';

export default {
  name: 'Posts',
  components: {
    Post,
  },
  data() {
    return {
      currentPage: 1,
      totalPages: 1,
      posts: [],
    }
  },
  methods: {
    calculateCountPages() {
      this.totalPages = Math.ceil(this.posts.length / POSTS_ON_PAGE);
    },

    slicePosts() {
      this.posts = this.posts.slice((this.currentPage - 1) * POSTS_ON_PAGE, this.currentPage * POSTS_ON_PAGE)
    },
  },
  //  beforeUpdate() {
  //   this.postsToRender = [...this.filteredPosts]
  //   this.calculateCountPages();
  //   this.slicePosts();
  //   console.log(this.postsToRender)
  // },
  async created() {
    this.posts = this.getPostsToRender;
    this.calculateCountPages();
    this.slicePosts();
    console.log(this.posts)
  },

  watch: {
    filteredPosts() {
      this.calculateCountPages();
    },

    currentPage() {
      this.slicePosts();
    },
  },

  computed: mapGetters(['getPostsToRender'])
}
</script>
  
<style>
  #pagination-bar {
    margin-bottom: 10px;
  } 
</style>