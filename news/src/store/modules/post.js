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
    async deletePost(ctx , id) {
      await axios_request
      .delete(('/posts/' + id))
      .then((response) => { if (response.status === 204) {
          this.dispatch('fetchPosts')
      } })
    }
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