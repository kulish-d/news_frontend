<template>
  <div id="user-page">
    <Header/>
    <div id="card-and-modal">

      <v-card tile>
        <v-col>
          <v-avatar size="100">
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
          </v-avatar>

        </v-col>
          <v-list-item color="rgba(0, 0, 0, .4)">
            <v-list-item-content>
              <v-list-item-title class="title">{{ username }}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

            <v-col id="user-btns"
              v-show="id===this.$store.getters.getUserId"
            >
                <v-btn
                  class="ma-2"
                  outlined
                  color="indigo"
                >
                  Edit profile
                </v-btn>

                <v-btn
                  class="ma-2"
                  outlined
                  color="indigo"
                >
                  Add Post
                </v-btn>
            </v-col>

        </v-card>

          <v-form
            v-if="id===this.$store.getters.getUserId"
            lazy-validation
          >
            <v-text-field
              v-model="username"
              label="Username"
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="Email"
              required
            ></v-text-field>
          </v-form>
      </div>

    <v-alert
      v-show="!this.posts.length"
      outlined
      type="success"
      text
    >
      there are no posts yet :)
    </v-alert>

    <v-progress-circular
      v-show="!this.posts"
      :size="100"
      :width="7"
      color="purple"
      indeterminate
    >
    </v-progress-circular>

    <Post
      v-for="post in posts"
      v-bind:key="post.id"
      :post="post"
    />

  </div>
</template>


<script>
import Header from '../components/Header.vue';
import Post from '@/components/Post.vue';
import { axios_request } from '../../api/post';
export default {
  name: 'UserPage',
  components: {
    Header,
    Post,
  },
  data() {
    return {
      username: '',
      email: '',
      posts: [],
    }
  },
  methods: {
    async getUserData() {
      await axios_request('/users/?id=' + this.id).then((res) => {if (res.statusText === 'OK') {
        this.username = res.data.username
        this.email = res.data.email
      }
    }).
    then(() => {
      axios_request('/users/' + this.id + '/posts/').then((res) => {if (res.statusText === 'OK') {
         this.posts = res.data
    }})
    })
    },
    getUsername() {
      return this.username
    }
  },
  
  async mounted() {
    await this.getUserData();
  },

  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.getUserData()
      },
    },
  },

  props: ['id']
}
</script>


<style scoped>
  #card-and-modal {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }
  @media (width < 801px) {
    #card-and-modal {
      justify-content: space-between;
    }
  }
  @media (width < 601px) {
    #card-and-modal {
      flex-direction: column;
    }
  }
  #user-btns {
    flex-direction: column;
  }

  .v-form {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-self: center;
  }
  .v-card {
    display: flex;
    align-self: center;
  }
  .col {
    display: flex;
    justify-content: space-between;
  }
</style>