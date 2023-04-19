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
import { mapActions, mapGetters } from 'vuex' 

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
      tabs: ['all', 'tags', 'authors'],
      defaultTab: 'all',

    }
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
  },
    computed: {
      ...mapGetters(['allPosts']),
      filteredPosts() {
        if (!this.filterKeyword.trim()) return this.posts;
        else {
          switch (this.defaultTab) {
          case 'all':
            return this.filterPostsByAllFields(this.posts);
          case 'tags': {
            return  this.filterPostsByTags(this.posts);
          }
          case 'authors':
            return this.filterPostsByAuthors(this.posts);
          default:
            return this.posts;
        }
      }
    }
  },
  async created() {
    await this.fetchPosts();
    this.posts = this.allPosts;
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