<!-- import Header from 'components.Header.vue' -->

<!-- import Posts from 'components.Posts.vue' -->

<template>
  <div id="main-page">
  <Header/>
  <Posts/>
  </div>
</template>
  
<script>
import Posts from '../components/Posts.vue'
import Header from '../components/Header.vue'
  export default {
    name: 'MainPage',
    components: {
      Header,
      Posts,
    }
  }
</script>
  
<style>

</style>