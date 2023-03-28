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
      label
      link
    >
      {{ getUsername }}
    </v-chip>

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
  #head {
    display: flex;
    justify-content: end;
  }
  #not-authed-user-bar, #auth-user-bar {
    display: flex;
  }
  #head-btn-register {
    order: -1;
  }
  #head-btn-register, #head-btn-auth, #user-label, .v-avatar {
    margin-right: 45px;
  }

  #user-label {
    margin-right: 15px;
    min-width: 70px;
    place-self: center;
  }
</style>