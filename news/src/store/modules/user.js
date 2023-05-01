import { axios_request, BASE_URL } from '../../../api/post'
export default {
  state: {
    userToken: localStorage.getItem('token'),
    userID: null,
    username: null,
    avatar: null,
    
    someUserData : {},

    authWindowIsOpen: false,
    registerWindowIsOpen: false,

  },
  
  actions: {
    async createUser(ctx, regForm) {
        await axios_request
        .post('/signup/', {
            username: regForm.username,
            email: regForm.email,
            password: regForm.password,
            avatar: regForm.avatar ? regForm.avatar[0] : '',
        }, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
    },

    async changeUserData(ctx, changingForm) {
      const token = localStorage.getItem('token');
      const FD = new FormData();
      FD.append('username', changingForm.username);
      FD.append('email', changingForm.email);
      if (changingForm.newAvatar) {
        FD.append('avatar', changingForm.newAvatar[0]);
      }
      await axios_request
      .patch('/me/', FD, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Token ' + token,
        }
      }
      )
      .then((res) => { if (res.status === 204) this.dispatch('getUser') })
      .catch((err) => { return err })
    },

    async authUser(ctx, authForm) {
      await axios_request
      .post('/token/login/', {
        email: authForm.email,
        password: authForm.password,
      })
      .then((res) => {
        console.log(res.data.access)
        localStorage.setItem('token', res.data.access);
      })
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
        .then((res) => { 
          const server_data  = {
            token: token,
            id: res.data.id,
            username: res.data.username,
            avatar: BASE_URL + res.data.avatar,
          }
          ctx.commit('updateUser', server_data)
        }
        )
      }
    },

    async getOtherUser(ctx, id) {
      try {
        const { data } =  await axios_request('/users/?id=' + id);
        return {
          username: data.username,
          email: data.email,
          avatar: BASE_URL + data.avatar
        }
      } catch (err) {
        // todo
      }
    }
  },
  
  mutations: {
    updateUser(state, some_data) {
      state.userToken = some_data.token;
      state.userID = some_data.id;
      state.username = some_data.username;
      state.avatar = some_data.avatar;
    },

    updateAuthWindow(state, status) {
      state.authWindowIsOpen = status;
    },

    updateRegisterWindow(state, status) {
      state.registerWindowIsOpen = status;
    },

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

    getMyAva(state) {
      return state.avatar
    },

    isOpenAuthWindow(state) {
      return state.authWindowIsOpen
    },

    isOpenRegisterWindow(state) {
      return state.registerWindowIsOpen
    },
  }
}
