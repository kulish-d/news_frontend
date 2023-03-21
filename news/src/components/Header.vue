<template>
  <v-app-bar
    id="head"
    app
    color="primary"
    dark
  >
   
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
}
</script>


<style scoped>
  #head {
    display: flex;
    justify-content: end;
  }
</style>