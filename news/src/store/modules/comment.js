import {axios_request} from '../../../api/post'
export default {
  state: {
    comments: [],
  },

  actions: {
    async fetchComments(ctx, postId) {
        try {
            const { data } = await axios_request('/comments/?=' + postId);
            // console.log(data)
            ctx.commit('initComments', data)
          }
          catch (err) {
            // err
          }
    },
    async pushComment(ctx, comObj) {
        // console.log(comObj);
        try {
            const { data } = await axios_request.post('/comments/', comObj);
            // console.log(data)
            ctx.commit('updateComments', data)
          }
          catch (err) {
            // err
          }
    },
    async deleteComment(ctx, id) {
        try {
            await axios_request.delete('/comments/' + id);
            ctx.commit('popComment', id)
          }
          catch (err) {
            // err
          }
    }
  },

  mutations: {
    updateComments(state, data) {
        state.comments.push(data)
    },

    initComments(state, data) {
        state.comments = data
    },

    popComment(state, id) {
        state.comments = state.comments.filter((com) => { return com.id !== id })
    }
  },


  getters: {
    postComments(state) {
        return state.comments
    }
  }

}