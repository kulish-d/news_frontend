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
    },

    async authUser(ctx, authForm) {
      const user = {
        username: authForm.username,
        email:    authForm.email,
        password: authForm.password,
      }
      axios_request
      .post('/auth/jwt/create/', user)
      .then((res) => {
        localStorage.user = res.data.access;
        ctx.commit('updateUser', user)
      })
    },
  },
  mutations: {
    updateUser(state, some_user) {
      state.user = some_user;
    }
  },
  state: {
    user: {}
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
}
