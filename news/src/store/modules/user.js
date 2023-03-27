import { axios_request} from '../../../api/post'
export default {
  state: {
    userToken: null || localStorage.getItem('token'),
    userID: null,
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
          ctx.commit('updateUser', localStorage.getItem('token'), response.data.id, response.data.username)
        }})
    },

    async authUser(authForm) {
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
        this.dispatch('getUser', token)
      })
    },

    logoutUser(ctx) {
      localStorage.removeItem('token');
      ctx.commit('updateUser', null)
    },

    async getUser(ctx, token=localStorage.getItem('token')) {
      if (token) {
      await axios_request.get('/me/', {
        headers: {
          Authorization: 'Token ' + token,
        }
      })
        .then((res) => {if (res.statusText === 'OK') { 
          ctx.commit('updateUser', token, res.data.user_id, res.data.username)
        }
        })
      }
    }

  },
  
  mutations: {
    updateUser(state, token, id, username) {
      state.userToken = token;
      state.userID = id;
      state.username = username;
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

    getUsername(state) {
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
