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
            axios_request
            .post('/auth/jwt/create/', {
                username: authForm.username,
                email:    authForm.email,
                password: authForm.password
            })
        .then(res => localStorage.username = res.data.access)
        // ctx.commit('updateUsers', this.user)
    },
  },
  mutations: {
  },
  state: {
    users: []
  },
  getters: {
    
  }
}
