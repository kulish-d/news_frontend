<template>
  <v-app>
    <v-main>
      <!-- <HelloWorld/> -->
      <MainPage/>
    </v-main>
  </v-app>
</template>

<script>

import MainPage from './pages/MainPage.vue';
export default {
  name: 'App',

  components: {
    MainPage,
  },

  data: () => ({
    //
  }),
};
</script>
