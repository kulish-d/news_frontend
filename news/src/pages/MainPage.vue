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
      :filteredPosts="filteredPosts"
    />
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

import Posts from '../components/Posts.vue'
import Header from '../components/Header.vue'
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
    }
  },
  computed: mapGetters(['allPosts']),
  methods: {
    ...mapActions(['fetchPosts']),
  },
  watch: {
    filterKeyword() {
      if (!this.filterKeyword.trim()) this.filteredPosts = this.posts;
      else {
        switch (this.defaultTab) {
          case 'all':
            this.filteredPosts = this.posts
              .filter((post) => 
                  [post.author.username.toLowerCase(), post.title.toLowerCase(), post.text.toLowerCase()]
                    .some((elem) => elem.includes(this.filterKeyword.toLowerCase()))  ||
                  post.tags
                    .some(tag =>
                        tag.text.toLowerCase().includes(this.filterKeyword.toLowerCase())
                    )
                  )
            break;
          case 'tags': {
            this.filteredPosts  = this.posts.filter((post) => post.tags.some(tag =>
              tag.text.toLowerCase().includes(this.filterKeyword.toLowerCase().trim())));
            break;
          }
          case 'authors':
            this.filteredPosts = this.posts.filter((post) =>
              post.author.username.toLowerCase().includes(this.filterKeyword.toLowerCase().trim()));
            break;
        }
      }
    }
  },
  async created() {
    await this.fetchPosts();
    this.posts = this.allPosts;
    this.filteredPosts = [...this.posts];
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
</style>