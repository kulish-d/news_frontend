import { axios_request, parseJwt } from '../../../api/post'
export default {
  state: {
    userToken: null || localStorage.getItem('token'),
    userID: localStorage.getItem('token') ? parseJwt(localStorage.getItem('token')).user_id : null,
    username: null,
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
      await axios_request
      .post('/token/login/', {
        email: authForm.email,
        password: authForm.password,
      })
      .then((res) => {if (res.statusText === 'OK') {
        localStorage.setItem('token', res.data.access);
        return res.data.access;
      }})
      .then((token) => {
        ctx.commit('updateUser', token);
        this.dispatch('getUsername')
      })
    },

    logoutUser(ctx) {
      localStorage.removeItem('token');
      ctx.commit('updateUser', null)
      ctx.commit('updateUsername', null)
    },

    async getUsername(ctx) {
      if (localStorage.getItem('token')) {
        const id = parseJwt(localStorage.getItem('token')).user_id;
        await axios_request.get(`user/?id=${id}`)
          .then((res) => {if (res.statusText === 'OK') { 
            ctx.commit('updateUsername', res.data.user)
      }
    })
      }
    }
  },
  
  mutations: {
    updateUser(state, token) {
      state.userToken = token;
    },

    updateUsername(state, user) {
      state.username = user;
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
