import axios from 'axios';
export default {
  actions: {
    async fetchPosts(ctx) {
      await axios
      .get('http://127.0.0.1:8000/posts/')
      .then(response => {(this.posts = response.data); console.log(this.posts)});
      ctx.commit('updatePosts', this.posts)
    },
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts
    }
  },
  state: {
    posts: []
  },
  getters: {
    allPosts(state) {
      return state.posts
    }
  }
}