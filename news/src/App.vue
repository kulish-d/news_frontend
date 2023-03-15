<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <v-main>
      <!-- <HelloWorld/> -->
      <MainPage/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import MainPage from './pages/MainPage.vue';

export default {
  name: 'App',

  components: {
    // HelloWorld,
    MainPage,
  },

  data: () => ({
    //
  }),
};
</script>
