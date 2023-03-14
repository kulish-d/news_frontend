<!-- import Header from 'components.Header.vue' -->

<!-- import Posts from 'components.Posts.vue' -->

<template>
  <div id="main-page">
  <Posts>

  </Posts>
  </div>
</template>
  
<script>
import Posts from '../components/Posts.vue'
  export default {
    name: 'MainPage',
    components: {
      Posts,
    }
  }
</script>
  
<style>

</style>