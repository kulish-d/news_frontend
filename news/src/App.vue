<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';



export default {
  name: 'App',

  components: {
    
  },

  methods: {
    ...mapActions(['getUser', 'getCurrentUserPosts'])
  },

  async mounted() {
    await this.getUser();
    await this.getCurrentUserPosts();
  }

};
</script>
