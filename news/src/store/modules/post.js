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
      // console.log('we here')
      await axios_request
      .get('/posts')
      .then((response) => {(this.posts = response.data)});
      ctx.commit('updatePosts', this.posts)
    },

    async getSomeUserPosts(ctx, id) {
      try {
        const { data } = await axios_request('/users/' + id + '/posts/');
        return data
      }
      catch (err) {
        // err
      }
    },

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
      .then(() => { 
          this.dispatch('fetchPosts')
      })
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

    updateSomeUserPosts(state, posts) {
      state.currentUserPosts = posts
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
    },

    getCurrentEditPost(state) {
      return state.posts.find((post) => post.id === state.currentPostId)
    }
  }
}