<template>
  <div id="user-page"
  >
    <Header/>
    <Post
      :post="post"
    />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Post from "@/components/Post.vue";

import {mapActions, mapGetters} from "vuex";

export default {
  name: "CommentPage",
  components: {
    Post,
    Header,
  },

  methods: {
    ...mapActions(['fetchPosts'])
  },

  beforeUpdate() {
    if (!this.post) this.$router.push('/')
  },

  created() {
    this.fetchPosts()
  },

  computed: {
    ...mapGetters(['allPosts']),
    post() {
      return this.allPosts.find((post) => post.id === this.id)
    }
  },
  props: ['id']
}
</script>

<style scoped>

</style>