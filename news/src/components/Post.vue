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
        <div v-if="post.tags"></div>
          <PostTag
              :tag="tag.text"
              v-bind:key="tag.id"
              v-for="tag in post.tags"
          />
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
    </v-card>
  </v-col>
</template>
    
<script>
import {mapGetters} from 'vuex';

import PostTag from '../components/PostTag.vue'

export default {
  name: 'Post',
  components: {
    PostTag,
  },
  computed: mapGetters(['isAuth']),
  props: ['post'],
}
</script>

<style>
  .v-card__subtitle a {
    text-decoration: none;
  }

  #post-card {
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }

  @media (width < 515px) {
    #post-card {
      flex-direction: column;
    }
  }

  #left-part-card {
    align-items: center;
  }

  #right-part-card{
    place-self: center;
  }
</style>