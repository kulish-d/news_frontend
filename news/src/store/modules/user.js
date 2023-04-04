import { axios_request} from '../../../api/post'
export default {
  state: {
    userToken: localStorage.getItem('token'),
    userID: null,
    username: null,
    authWindowIsOpen: false,
    registerWindowIsOpen: false,
    postWindowIsOpen: false,
  },
  
  actions: {
    async createUser(ctx, regForm) {
        await axios_request
        .post('/signup/', {
            username: regForm.username,
            email: regForm.email,
            password: regForm.password
        })
    },

    async authUser(ctx, authForm) {
      await axios_request
      .post('/token/login/', {
        email: authForm.email,
        password: authForm.password,
      })
      .then((res) => {if (res.statusText === 'OK') {
        localStorage.setItem('token', res.data.access);
      }})
      .then(() => {
        this.dispatch('getUser')
      })
    },

    logoutUser(ctx) {
      localStorage.removeItem('token');
      const null_data  = {
        token: null,
        id: null,
        username: null
      }
      ctx.commit('updateUser', null_data)
    },

    async getUser(ctx) {
      const token = localStorage.getItem('token')
      if (token) {
      await axios_request.get('/me/', {
        headers: {
          Authorization: 'Token ' + token,
        }
      })
        .then((res) => {if (res.statusText === 'OK') { 
          const server_data  = {
            token: token,
            id: res.data.user_id,
            username: res.data.username
          }
          ctx.commit('updateUser', server_data)
        }
        })
      }
    }

  },
  
  mutations: {
    updateUser(state, some_data) {
      state.userToken = some_data.token;
      state.userID = some_data.id;
      state.username = some_data.username;
    },

    updateAuthWindow(state, status) {
      state.authWindowIsOpen = status;
    },

    updateRegisterWindow(state, status) {
      state.registerWindowIsOpen = status;
    },

    updatePostWindow(state, status) {
      state.postWindowIsOpen = status;
    }
  },

  getters: {
    isAuth(state) {
      return !!state.userToken
    },

    getUsername(state) {
      return state.username
    },

    getUserId(state) {
      return state.userID
    },

    isOpenAuthWindow(state) {
      return state.authWindowIsOpen
    },

    isOpenRegisterWindow(state) {
      return state.registerWindowIsOpen
    },

    isOpenPostWindow(state) {
      return state.postWindowIsOpen
    }
  }
}
