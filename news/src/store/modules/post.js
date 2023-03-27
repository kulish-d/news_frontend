import {axios_request} from '../../../api/post'
export default {
  actions: {
    async fetchPosts(ctx) {
      await axios_request
      .get('/posts/')
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