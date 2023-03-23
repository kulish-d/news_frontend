import axios_request from '../../../api/post'
export default {
  state: {
    userID: null,
    username: null,
  },
  actions: {
    async createUser(ctx, regForm) {
        await axios_request
        .post('/signup/', {
            username: regForm.username,
            email: regForm.email,
            password: regForm.password
        })
        .then((response) => {if (response.statusText === 'OK') {
          ctx.commit('updateUser', response.data.id, response.data.username)
        }})
    },

    async authUser(ctx, authForm) {
      axios_request
      .post('/token/login/', {
        email: authForm.email,
        password: authForm.password,
      })
      .then((res) => {if (res.statusText === 'OK') {
        localStorage.token = res.data.access;
      }})
    },

    logoutUser(ctx) {
      localStorage.token = '';
      console.log(ctx, 'logout!');
      ctx.commit('updateUser', null, null)
    }
  },
  
  mutations: {
    updateUser(state, id, name) {
      state.userID = id;
      state.username = name,
      console.log(state.username)
    }
  },

  getters: {
    // getUser(state) {
    //   return state.username;
    // },
    isAuth(state) {
      return !!state.userID
    }
  }
}
