<template>
  <v-app-bar
    id="head"
    app
    color="primary"
    dark
  >

  <div
    id="not-authed-user-bar"
    v-if="!isAuth"
  >
    <v-btn
      id="head-btn-auth"
      color="black"
      elevation="15"
      large
      v-bind="attrs"
      v-on="on"
    >
      Sign In
    </v-btn>

    <v-btn
      id="head-btn"
      color="purple darken-1"
      elevation="15"
      large
      v-bind="attrs"
      v-on="on"
    >
      Sign Up
    </v-btn>
  </div>

  <div
    v-else
    id="auth-user-bar"
  >
    <span
      id="user-label"
    >
      {{ this.$store.state.username }}
    </span>

    <v-avatar
      color="teal"
      size="48"
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

  <RegisterForm
  />

  <AuthForm
  />

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
    openDialog() {
      
    }
  },
  computed: mapGetters(['isAuth']),
}
</script>


<style scoped>
  #head {
    display: flex;
    justify-content: end;
  }

</style>