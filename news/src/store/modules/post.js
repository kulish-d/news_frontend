import {axios_request} from '../../../api/post'
export default {
  state: {
    posts: [],
    postsToRender: [],
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

    // async getCurrentUserPosts(ctx) {
    //   await axios_request('/users/' + this.state.user.userID + '/posts/')
    //   .then((res) => {if (res.statusText === 'OK') {
    //     ctx.commit('updateUserPosts', res.data)
    // }})
    // },

    async addPost(ctx, PostForm) {
      await axios_request.post('/posts/', {
        title: PostForm.title,
        text: PostForm.text,
        tags: JSON.stringify(PostForm.tags.map((tag) => { return tag.replace(/\s+/g, ' ').trim() }).filter((tag) => { return tag !== '' })),
        image: PostForm.image
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Token ' + localStorage.getItem('token'),
        }
      })
      .then((res) => {
        if (res.status === 201) {
          PostForm.title = '',
          PostForm.text = '',
          PostForm.tags = '',
          PostForm.image = null,
          this.dispatch('fetchPosts')
          ctx.commit('updatePostWindow', {isOpen: false})
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
      .patch('/posts/' + this.state.post.currentPostId + '/', editForm , {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Token ' + localStorage.getItem('token'),
        }
      })
      .then((res) => {
        if (res.status === 200) {
          this.dispatch('fetchPosts')
          ctx.commit('updatePostWindow', {isOpen: false})
    }
    })
    }
  },

  mutations: {
    updatePosts(state, posts) {
      state.posts = posts
    },

    // updateUserPosts(state, posts) {
    //   state.currentUserPosts = posts
    // },

    updatePostsToRender(state, posts) {
      state.postsToRender = posts
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

    // userPosts(state) {
    //   return state.currentUserPosts
    // },



    isOpenPostWindow(state) {
      return state.postWindow.isOpen
    },

    getPostsToRender(state) {
      return state.postsToRender
    },

    getCurrentEditPost(state) {
      return state.posts.find((post) => post.id === state.currentPostId)
    }
  }
}