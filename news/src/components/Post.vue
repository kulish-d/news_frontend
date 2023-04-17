<template>
  <v-col>
    <v-card elevation="10" outlined shaped width="100%" id="post-card">
      <div id="left-part-card">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-subtitle v-if="isAuth">
          <router-link :to="{name: 'users', params: {id: post.author.id}}">{{post.author.username}}</router-link>
        </v-card-subtitle>
        <v-card-subtitle v-else>
          {{post.author.username}}
        </v-card-subtitle>
        <v-card-text>{{ post.text }}</v-card-text>
        <div v-if="post.tags">
          <PostTag
            :tag="tag.text"
            v-bind:key="tag.id"
            v-for="tag in post.tags"
          />
        </div>
      </div>

      <div id="right-part-card">
        <v-img
         :src="post.image"
         contain
         max-width="300"
         max-height="200"
         id="post-img">
        </v-img>
      </div>

      <div id="manage-btns"
        v-if="post.author.id===getUserId && $route.name==='users'"
      >
        <v-btn
          @click="edit(post.id)"
          color="primary"
          elevation="15"
          outlined
          x-large
        >
        EDIT
        </v-btn>
        <v-btn
          @click="deletePost(post.id)"
          color="error"
          elevation="15"
          outlined
          x-large
        >
        DELETE
        </v-btn>
      </div>

    </v-card>
  </v-col>
</template>
    
<script>
import {mapGetters, mapActions} from 'vuex';

import PostTag from '../components/PostTag.vue'

export default {
  name: 'Post',
  components: {
    PostTag,
  },
  methods: {
    edit(id) {
      this.$store.commit('updateCurrentPost', id)
      
    },
    ...mapActions(['deletePost', 'editPost']),
    },
  
  computed: {
    ...mapGetters(['isAuth', 'getUserId']),
  },
  props: ['post'],
}
</script>

<style scoped>
  .v-card__subtitle a {
    text-decoration: none;
  }

  #post-card {
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }

  #manage-btns {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  
  @media (width < 515px) {
    #post-card {
      flex-direction: column;
    }
    #right-part-card {
      margin-bottom: 20px;
    }
  }

  #left-part-card {
    align-items: center;
  }

  #right-part-card{
    place-self: center;
  }
</style>