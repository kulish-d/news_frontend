<template>
  <div id="user-page"
  >
    <Header/>
    <div id="card-and-modal"
      v-if="this.id"
      >
      <v-card id="user-card" tile max-width="400">
        <v-col>
          <v-avatar size="150">
            <v-img :src="this.UserDataForm.avatar"></v-img>
          </v-avatar>
        </v-col>
        <v-col id="data-and-buttons">
          <div id="username">{{ UserDataForm.username }}</div>
          <div id="email">{{ UserDataForm.email }}</div>
          <div id="user-btns"
            v-if="showUserActions()"
          >
            <v-btn
              v-on:click="openOrCloseEditProfileWindow(true)"
              class="ma-2"
              outlined
              color="indigo"
            >
              Edit profile
            </v-btn>

            <v-btn
              v-on:click="openPostFormToAdd"
              class="ma-2"
              outlined
              color="indigo"
            >
              Add Post
            </v-btn>
          </div>
        </v-col>
          
      </v-card>
      <v-dialog
        v-model="isOpenEditWindow"
        transition="dialog-top-transition"
      >
        <v-card id="edit-profile-form"
          lazy-validation
        >
          <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="UserDataForm.username"
                label="Username"
              ></v-text-field>

              <v-text-field
                v-model="UserDataForm.email"
                label="Email"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-file-input chips multiple label="Change your ava?"
                v-model="UserDataForm.newAvatar"
                accept="image/*"
                hint="not required"
              >
              </v-file-input>

              <v-btn
                v-on:click="changeUserData"
              >
                Change
              </v-btn>
            </v-col>
          </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      </div>
    <div v-else> 
      <v-progress-circular
        :size="100"
        :width="7"
        color="purple"
        indeterminate
      >
      </v-progress-circular>
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

    <PostForm
      v-if="$store.state.post.postWindow.isOpen"
    />

  </div>
</template>


<script>
import { axios_request, BASE_URL } from '../../api/post';
import { mapGetters } from "vuex";

import Header from '../components/Header.vue';
import PostForm from '@/components/PostForm.vue';
import Post from '@/components/Post.vue';

export default {
  name: 'UserPage',
  components: {
    PostForm,
    Header,
    Post,
  },

  data() {
    return {
      UserDataForm: {
        username: '',
        email: '',
        avatar: '',
        newAvatar: null,
      },

      posts: [],

      isOpenEditWindow: false,
    }
  },

  methods: {
    async getUserData() {
      await axios_request('/users/?id=' + this.id).then((res) => {if (res.statusText === 'OK') {
        this.UserDataForm.username = res.data.username,
        this.UserDataForm.email = res.data.email,
        this.UserDataForm.avatar = BASE_URL + res.data.avatar
      }
    }).
    then(() => {
      axios_request('/users/' + this.id + '/posts/').then((res) => {if (res.statusText === 'OK') {
         this.posts = res.data
    }})
    })
    },

    changeUserData() {
      this.$store.dispatch('changeUserData', this.UserDataForm)
      .then(() => {
        this.getUserData();
      })
      .then(() => this.openOrCloseEditProfileWindow(false))
    },


    openOrCloseEditProfileWindow(status) {
      this.isOpenEditWindow = status;
    },

    showUserActions() {
      return this.id == this.$store.getters.getUserId;
    },

    openPostFormToAdd(){
      this.$store.commit('updatePostWindow', {isOpen: true});
    },

    getUsername() {
      return this.UserDataForm.username;
    }
  },
  
  async mounted() {
    await this.getUserData();
  },

  async beforeMount() {
    await this.$store.dispatch('fetchPosts')
    await this.showUserActions();
  },

  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.getUserData()
      },
    },
    allPosts() {
      this.getUserData()
    }
  },

  computed: {
    ...mapGetters(['isOpenPostWindow', 'allPosts', 'getCurrentEditPost']),
  },

  props: ['id']
}
</script>


<style>
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
      justify-content: center;
    }

    #user-card {

    }
    #edit-profile-form {
      
    }
  }

  #alerts-and-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #user-card {
    display: flex;
    align-self: center;
  }

  #data-and-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #user-btns {
    display: flex;;
    flex-direction: column;
    justify-content: center;
  }

  #edit-profile-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #add-post-form-card {
    overflow: hidden;
  }


</style>