<template>
  <v-app-bar
    id="head"
    app
    color="primary"
    dark
  >
   
  <v-btn
    id="head-btn-logout"
    color="teal lighten-1"
    v-if="hasUser()"
    elevation="15"
    large
    v-bind="attrs"
    v-on:click="logOut()"
  >
    Log Out
  </v-btn>

  <RegisterForm
  />

  <AuthForm 
  />
      
  </v-app-bar>
</template>


<script>
import RegisterForm from './RegisterForm.vue';
import AuthForm from './AuthForm.vue';
export default {
  name: 'Header',
  components: {
    RegisterForm,
    AuthForm,
  },
  methods: {
    hasUser() {
      return this.$store.user;
    },
    logOut() {
      return this.$store.dispatch('logoutUser');
    }
  }
}
</script>


<style scoped>
  #head {
    display: flex;
    justify-content: end;
  }
</style>