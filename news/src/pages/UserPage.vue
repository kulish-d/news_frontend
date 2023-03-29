<template>
  <div id="user-page">
    <Header/>
    <v-card max-width="434" tile>
      <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
      <v-col>
        <v-avatar size="100">
          <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
        </v-avatar>
        <v-btn
          class="ma-2"
          outlined
          color="indigo"
        >
          Edit profile
        </v-btn>
      </v-col>
        <v-list-item color="rgba(0, 0, 0, .4)">
          <v-list-item-content>
            <v-list-item-title class="title">Marcus Obrien</v-list-item-title>
            <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
              class="ma-2"
              outlined
              color="indigo"
            >
              Add Post
          </v-btn>
        </v-list-item>
    </v-card>
  
  
  </div>
</template>


<script>
import Header from '../components/Header.vue'
export default {
  name: 'UserPage',
  components: {
    Header,
  }
}
</script>


<style>
  .col {
    display: flex;
    justify-content: space-between;
  }
</style>