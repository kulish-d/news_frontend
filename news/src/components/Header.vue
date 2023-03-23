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
    v-if="isAuth"
    elevation="15"
    large
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
import {mapGetters} from 'vuex';
export default {
  name: 'Header',
  components: {
    RegisterForm,
    AuthForm,
  },
  // data() {
  //   return {
  //     user: ''
  //   }
  // },

  // mounted() {
  //   this.user = this.$store.state.user;
  //   console.log(this.user)
  // },

  methods: {
    // hasUser() {
    //   return this.$store.user;
    // },
    logOut() {
      // console.log(this.$store.state.user)
      return this.$store.dispatch('logoutUser');
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
  #head-btn-logout {
    margin-right: 50px;
  }
</style>