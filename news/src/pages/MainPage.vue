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
        v-if="!finalPosts.length"
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
      :finalPosts="finalPosts"
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
      finalPosts: [],
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
      if (!this.filterKeyword.trim()) this.finalPosts = this.posts;
      else {
        switch (this.defaultTab) {
          case 'all':
            console.log('we here');
            break;
          case 'tags':
            console.log("it's tags!!!");
            break;
          case 'authors':
            this.finalPosts = this.posts.filter((post) => post.author.username.toLowerCase().includes(this.filterKeyword.toLowerCase().trim()));
            break;
        }
        console.log(this.finalPosts)
      }
    }
  },
  async created() {
    await this.fetchPosts();
    this.posts = this.allPosts;
    this.finalPosts = [...this.posts];
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