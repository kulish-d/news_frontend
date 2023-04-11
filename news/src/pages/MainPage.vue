<template>
  <div id="main-page">
    <Header/>
    <v-row id="searcher">
      <v-col cols="4">
        <v-text-field
          v-model="filterKeyword"
          placeholder="Search content"
          autofocus
        >
        </v-text-field>
      </v-col>
      <v-col cols="4">
        <v-select
          label="Filter by?"
          :items="tabs"
          v-model="defaultTab"
          variant="underlined"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row id="posts-loader">
      <v-progress-circular
        v-if="!filteredPosts.length"
        model-value="20"
        indeterminate
        color="blue"
        :size="50"
        :width="10"
      >
      </v-progress-circular>
    </v-row>
    <Posts
      id="posts"
      :filteredPosts="postsToRender"
    />
    <div class="text-center" id="pagination-bar">
      <v-pagination
        v-model="currentPage"
        :total-visible="totalVisiblePages"
        :length="totalPages"
        circle
      >
      </v-pagination>
  </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

import Posts from '../components/Posts.vue'
import Header from '../components/Header.vue'
import { POSTS_ON_PAGE } from '../../constants'
export default {
  name: 'MainPage',
  components: {
    Header,
    Posts,
  },
  data() {
    return {
      posts: [],
      filterKeyword: '',
      filteredPosts: [],
      tabs: ['all', 'tags', 'authors'],
      defaultTab: 'all',
      currentPage: 1,
      totalPages: 1,
      totalVisiblePages: 1,
      postsToRender: [],
    }
  },
  computed: {
    ...mapGetters(['allPosts']),
  },
  methods: {
    ...mapActions(['fetchPosts']),
    filterPostsByAllFields(posts) {
      return posts
              .filter((post) => 
                [post.author.username.toLowerCase(), post.title.toLowerCase(), post.text.toLowerCase()]
                  .some((elem) => elem.includes(this.filterKeyword.toLowerCase().trim()))  ||
                post.tags
                  .some(tag =>
                      tag.text.toLowerCase().includes(this.filterKeyword.toLowerCase().trim())
                  )
              )
    },
    filterPostsByTags(posts) {
      return posts
              .filter((post) => 
                post.tags.some(tag =>
                  tag.text.toLowerCase().includes(this.filterKeyword.toLowerCase().trim())
                )
              );
    },
    filterPostsByAuthors(posts) {
      return posts
              .filter((post) =>
                post.author.username.toLowerCase().includes(this.filterKeyword.toLowerCase().trim())
              );
    },
    calculateCountPages() {
      this.totalPages = Math.ceil(this.filteredPosts.length / POSTS_ON_PAGE);
      this.totalVisiblePages = Math.ceil(this.totalPages * 0.7)
    },
    slicePosts() {
      this.postsToRender = this.filteredPosts.slice((this.currentPage - 1) * POSTS_ON_PAGE, this.currentPage * POSTS_ON_PAGE)
    },
  },
  watch: {
    filterKeyword() {
      if (!this.filterKeyword.trim()) this.filteredPosts = this.posts;
      else {
        switch (this.defaultTab) {
          case 'all':
            this.filteredPosts = this.filterPostsByAllFields(this.posts);
            break;
          case 'tags': {
            this.filteredPosts  = this.filterPostsByTags(this.posts);
            break;
          }
          case 'authors':
            this.filteredPosts = this.filterPostsByAuthors(this.posts);
            break;
        }
        this.slicePosts();
      }
    },
    currentPage() {
      this.slicePosts();
    },
  },
  async created() {
    await this.fetchPosts();
    this.posts = this.allPosts;
    this.filteredPosts = [...this.posts];
    this.calculateCountPages();
    this.slicePosts();
  }
}
</script>


<style scoped>
  #searcher, #posts-loader {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  #posts-loader {
    margin-bottom: 20px;
  }
  #pagination-bar {
    margin-bottom: 10px;
  }
</style>