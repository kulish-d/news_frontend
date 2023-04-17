import {axios_request} from '../../../api/post'
export default {
  state: {
    posts: [],
    postWindow: {
      isOpen: false,
      isEdit: false,
    },
    currentPostId: 0,
  },
  
  actions: {
    async fetchPosts(ctx) {
      await axios_request
      .get('/posts/')
      .then((response) => {(this.posts = response.data)});
      ctx.commit('updatePosts', this.posts)
    },

    async addPost(ctx, PostForm) {
      await axios_request.post('/posts/', {
        title: PostForm.title,
        text: PostForm.text,
        tags: JSON.stringify(PostForm.tags.map((tag) => { return tag.replace(/\s+/g, ' ').trim() }).filter((tag) => { return tag !== '' })),
        image: PostForm.image[0]
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Token ' + localStorage.getItem('token'),
        }
      })
    },

    async deletePost(ctx , id) {
      await axios_request
      .delete(('/posts/' + id))
      .then((response) => { if (response.status === 204) {
          this.dispatch('fetchPosts')
      } })
    },

    async editPost(ctx, editForm) {
      await axios_request
      .patch('/posts/' + this.state.currentPostId, {
        title: editForm.title,
        text: editForm.text,
        tags: JSON.stringify(editForm.tags.map((tag) => { return tag.replace(/\s+/g, ' ').trim() }).filter((tag) => { return tag !== '' })),
        image: editForm.image[0]
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: 'Token ' + localStorage.getItem('token'),
        }
      })
    }
  },

  mutations: {
    updatePosts(state, posts) {
      state.posts = posts
    },

    updatePostWindow(state, data) {
      state.postWindow.isOpen = data.isOpen
      state.postWindow.isEdit = data.isEdit || false
    },

    updateCurrentPost(state, id) {
      state.currentPostId = id
    }
  },

  getters: {
    allPosts(state) {
      return state.posts
    },

    isOpenPostWindow(state) {
      return state.postWindow.isOpen
    }
  }
}