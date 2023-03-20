<template>
  <v-app-bar
    id="head"
    app
    color="primary"
    dark
  >

    <div id="head-btn-grp">
      <v-btn 
        id="head-btn"
        color="purple darken-1"
        elevation="15"
        
        large>
        Вход
      </v-btn>
      
      <v-btn
        id="head-btn"
        color="purple darken-1"
        elevation="15"
        
        large>
        Регистрация
      </v-btn>
    </div>
  </v-app-bar>
</template>


<script>
export default {
  name: 'Header',
  components: {
  },
}
</script>


<style scoped>
  #head {
    display: flex;
    justify-content: end;
  }
  #head-btn-grp {
    display: flex;
    justify-content: space-between;
  }
  #head-btn {
    margin: 10px;
  }
</style>