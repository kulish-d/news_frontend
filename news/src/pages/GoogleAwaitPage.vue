<template>
    <div id="google-page">
      <Header/>
      <v-progress-linear
        indeterminate
        color="green"
        height="15"
      >
      </v-progress-linear>
    </div>
</template>

<script>
import Header from '../components/Header';
import { axios_request } from '../../api/post';
export default {
  name: 'GooglePage',
  components: {
    Header,
  },
  async mounted() {
    await axios_request.post('/google/login/', {
        // 'grant_type': 'authorization_code',
        'code': this.$route.query.code,
        // 'redirect_uri': 'http://localhost:8080'
    })
    .then((res) => console.log(res.response.data))
  }
}
</script>

<style scoped>

</style>