<template>
  <v-app-bar
    id="head"
    app
    color="primary"
    dark
  >

  <v-tabs id="tabs">
    <v-tab v-show="$route.path!='/'">
      <router-link to="/">Main Page</router-link>
    </v-tab>
  </v-tabs>

  <div
    id="not-authed-user-bar"
    v-if="!isAuth"
  >

    <v-btn
      id="head-btn-auth"
      color="black"
      elevation="15"
      large
      v-on:click="openAuthForm"
    >
      Sign In
    </v-btn>

    <AuthForm
    />

    <v-btn
      id="head-btn-register"
      color="purple darken-1"
      elevation="15"
      large
      v-on:click="openRegisterForm"
    >
      Sign Up
    </v-btn>

    <RegisterForm
    />

  </div>

  <div
    v-else
    id="auth-user-bar"
  >

    <v-chip
      id="user-label"
      close-icon="mdi-close-outline"
      color="green"
    >
      <router-link to="/users">{{ getUsername }}</router-link>
    </v-chip>

    <v-avatar
      id="avatar"
      color="teal"
      size="38"
    >
    </v-avatar>

    <v-btn
      id="head-btn-logout"
      color="teal lighten-1"
      elevation="15"
      large
      v-on:click="logOut()"
    >
      Log Out
    </v-btn>
  
  </div>

  </v-app-bar>
</template>


<script>
import RegisterForm from './RegisterForm.vue';
import AuthForm from './AuthForm.vue';
import {mapGetters} from 'vuex';
export default {
  name: 'Header',
  components: {
    RegisterForm,
    AuthForm,
  },

  methods: {
    logOut() {
      return this.$store.dispatch('logoutUser');
    },

    openAuthForm(){
      this.$store.commit('updateAuthWindow', true);
    },

    openRegisterForm(){
      this.$store.commit('updateRegisterWindow', true);
    },
  },

  async mounted() {
    await this.$store.dispatch('getUser');
  },

  computed: mapGetters(['isAuth', 'getUsername']),
}
</script>


<style scoped>
  #head *{
    display: flex;
    justify-content: space-between;
  }

  #tabs {
  }

  #not-authed-user-bar, #auth-user-bar {
    display: flex;
    justify-content: space-between;
  }

  #auth-user-bar > * {
    margin-right: 10px;
  }

  #head-btn-register {
    order: -1;
  }

  #head-btn-logout {
    margin-right: 0;
  }
  #user-label, .v-avatar {
    place-self: center;
  }

  .v-application a {
    color: white;
    text-decoration: none;
  }

  .v-toolbar__content, .v-toolbar__extension {

}
  .v-chip {
    cursor: pointer;
  }
</style>