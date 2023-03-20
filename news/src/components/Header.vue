<template>
  <v-app-bar
    id="head"
    app
    color="primary"
    dark
  >
   
      <RegisterForm
        
      />
      
  </v-app-bar>
</template>


<script>
import RegisterForm from './RegisterForm.vue';
export default {
  name: 'Header',
  components: {
    RegisterForm,
  },
}
</script>


<style scoped>
  #head {
    display: flex;
    justify-content: end;
  }
</style>