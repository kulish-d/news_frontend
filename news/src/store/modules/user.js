import axios_request from '../../../api/post'
export default {
  state: {
    userID: null,
    username: null,
    userToken: localStorage.getItem('token'),
    authWindowIsOpen: false,
    registerWindowIsOpen: false,
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
        console.log(res);
        localStorage.setItem('token', res.data.access);
        return res.data.access;
      }})
      .then((token) => ctx.commit('updateUser', token))
    },

    logoutUser(ctx) {
      localStorage.removeItem('token');
      console.log(ctx, 'logout!');
      ctx.commit('updateUser', null)
    },


  },
  
  mutations: {
    updateUser(state, token) {
      state.userToken = token;
    },

    updateAuthWindow(state, status) {
      state.authWindowIsOpen = status;
    },

    updateRegisterWindow(state, status) {
      state.registerWindowIsOpen = status;
    }
  },

  getters: {
    isAuth(state) {
      return !!state.userToken
    },

    getUser(state) {
      return state.username
    },

    isOpenAuthWindow(state) {
      return state.authWindowIsOpen
    },

    isOpenRegisterWindow(state) {
      return state.registerWindowIsOpen
    }
  }
}
