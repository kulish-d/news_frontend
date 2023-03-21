import axios_request from '../../../api/post'
export default {
  actions: {
    async createUser(ctx, regForm) {
        await axios_request
        .post('/auth/users/', {
            username: regForm.username,
            email: regForm.email,
            password: regForm.password
        })
        .then(response => {(console.log(response.data)); console.log(this.users)});
        // ctx.commit('updateUsers', this.user)
    },

    // async fetchUsers(ctx) {
    //   await axios_request
    //   .get('/users/')
    //   .then(response => {(this.users = response.data); console.log(this.users)});
    //   ctx.commit('updatePosts', this.users)
    // },
  },
  mutations: {
    updateUsers(state, user) {
      state.users.push(user)
    }
  },
  state: {
    users: []
  },
  getters: {
    allUsers(state) {
      return state.users
    }
  }
}