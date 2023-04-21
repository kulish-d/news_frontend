<template>
  <div id="comment-page"
  >
    <Header/>
    <Post
      :post="post"
    />
    <v-row id="comment-input">
      <v-col cols="10">
        <v-text-field
          @keydown.enter="addComment"
          v-model="commentText"
          label="Whay do you think about this?"
          hint="press Enter to add"
          counter="30"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <Comments
      v-if="comments"
      :comments="comments"
    />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Post from "@/components/Post.vue";
import Comments from '@/components/Comments.vue';

import {mapActions, mapGetters} from "vuex";

export default {
  name: "CommentPage",
  components: {
    Post,
    Header,
    Comments,
  },

  data() {
    return {
      commentText: '',
      comments: [],
    }
  },

  methods: {
    ...mapActions(['fetchPosts', 'fetchComments', 'pushComment']),
    addComment() {
      if (this.commentText.length < 30) {
        this.pushComment({
          author: this.getUserId,
          post: this.id,
          text: this.commentText,
        })
        this.commentText = ''
      }
    },
  },

  beforeUpdate() {
    if (!this.post) this.$router.push('/')
  },

  async created() {
    await this.fetchPosts()
    await this.fetchComments(this.id)
    this.comments = this.postComments
  },

  watch: {
    postComments() {
      this.comments = this.postComments
    }
  },

  computed: {
    ...mapGetters(['allPosts', 'getUserId', 'postComments']),
    post() {
      return this.allPosts.find((post) => post.id === this.id)
    },
    // comments() {
    //   return this.postComments
    // }
  },
  props: ['id']
}
</script>

<style scoped>
  #comment-input {
    justify-content: center;
  }
</style>