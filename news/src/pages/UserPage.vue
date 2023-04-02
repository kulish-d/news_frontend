<template>
  <div id="user-page">
    <Header/>
    <div id="card-and-modal">

      <v-card id="user-card" tile max-width="500">
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
                  v-on:click="openPostAddForm"
                  class="ma-2"
                  outlined
                  color="indigo"
                >
                  Add Post
                </v-btn>
            </v-col>

        </v-card>

        <v-form id="edit-profile-form"
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

    <v-dialog
      v-model="isOpenPostWindow"
      @click:outside="closeForm"
      persistent
    >
      <v-card id="add-post-form-card">
        <v-card-title>
          <span>NEW POST</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                label="Title"
                counter="20"
                required
                v-model="PostForm.title"
              >
              </v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                label="Text"
                counter="200"
                required
                v-model="PostForm.text"
              >
              </v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeForm"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="addPost"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import {mapGetters} from "vuex";
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
      PostForm: {
        title: '',
        text: '',
        tags: [],
      }
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

    async addPost() {
      await axios_request.post('/posts/', {
        title: this.PostForm.title,
        text: this.PostForm.text,
        tags: this.PostForm.tags
      }, {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('token'),
        }
      })
      .then((res) => {
        if (res.status === 201) {
          this.closeForm()
          this.getUserData()
        }
      })
    },

    openPostAddForm(){
      this.$store.commit('updatePostWindow', true);
    },

    closeForm() {
      this.$store.commit('updatePostWindow', false)
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

  computed: mapGetters(['isOpenPostWindow']),

  props: ['id']
}
</script>


<style scoped>
  #user-page {
  }

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
      width: 90%;
      flex-direction: column;
    }

    #user-card {

    }
    #edit-profile-form {
      width: 90%;
    }
  }

  #user-card {
    display: flex;
    align-self: center;
  }

  #user-btns {
    flex-direction: column;
  }

  #edit-profile-form {
    place-self: center;
  }

  #add-post-form-card {
    overflow: hidden;
  }


</style>