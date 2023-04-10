import {axios_request} from '../../../api/post'
export default {
  state: {
    posts: []
  },
  
  actions: {
    async fetchPosts(ctx) {
      await axios_request
      .get('/posts/')
      .then((response) => {(this.posts = response.data)});
      ctx.commit('updatePosts', this.posts)
    },
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts
    }
  },

  getters: {
    allPosts(state) {
      return state.posts
    }
  }
}