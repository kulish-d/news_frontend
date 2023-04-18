<template>
  <div>
    <Post
      v-for="post in postsToRender"
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

export default {
  name: 'Posts',
  components: {
    Post,
  },
  data() {
    return {
      currentPage: 1,
      totalPages: 1,
      postsToRender: [],
    }
  },
  methods: {
    calculateCountPages() {
      this.totalPages = Math.ceil(this.filteredPosts.length / POSTS_ON_PAGE);
    },

    slicePosts() {
      this.postsToRender = this.filteredPosts.slice((this.currentPage - 1) * POSTS_ON_PAGE, this.currentPage * POSTS_ON_PAGE)
    },
  },
  async created() {
    this.postsToRender = await [...this.filteredPosts]
    this.calculateCountPages();
    this.slicePosts();
    console.log(this.postsToRender)
  },
  watch: {
    filteredPosts() {
      this.calculateCountPages();
    },

    currentPage() {
      this.slicePosts();
    },
  },
  props: ['filteredPosts']
}
</script>
  
<style>
  #pagination-bar {
    margin-bottom: 10px;
  } 
</style>