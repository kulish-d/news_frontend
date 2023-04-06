<template>
  <div id="user-page"
  >
    <Header/>
    <div id="card-and-modal"
      v-if="this.id"
      >
      <v-card id="user-card" tile max-width="500">
        <v-col>
          <v-avatar size="100">
            <v-img :src="this.avatar"></v-img>
          </v-avatar>

        </v-col>
          <v-list-item color="rgba(0, 0, 0, .4)">
            <v-list-item-content>
              <v-list-item-title class="title">{{ username }}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

            <v-col id="user-btns"
              v-if="showUserActions"
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
          v-if="showUserActions"
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
    <div v-else> 
      <v-progress-circular
      :size="100"
      :width="7"
      color="purple"
      indeterminate
      >
      </v-progress-circular>
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
            <v-row>

              <v-combobox
                v-model="PostForm.tags"
                chips
                clearable
                label="Tags"
                multiple
                hint="Maximum tag size: 15 symbols, for add press Enter"
                >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="removeChip(item)"
                  >
                    <strong>{{ item }}</strong>&nbsp;
                  </v-chip>
                </template>
              </v-combobox>

            </v-row>
            <v-row>
              <v-file-input chips multiple label="Choose the image"
                v-model="PostForm.image"
                accept="image/*"
                :rules="imageRules"
                hint="required"
              >
              </v-file-input>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions id="alerts-and-buttons">

          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeForm"
          >
            Close
          </v-btn>


          <v-alert
              v-show="!(this.PostForm.title && this.PostForm.text && this.PostForm.tags.length && this.PostForm.image)"
              text
              type="warning"
              outlined
              title="Pffff.."
          >
            All fields are required!
          </v-alert>

          <v-alert
            v-show="addPostError"
            text
            type="error"
            outlined
            title="Ooops 0_o"
          >
            <div v-if="addPostErrorText.title">title: {{ addPostErrorText.title[0] }}</div>
            <div v-if="addPostErrorText.text">text: {{ addPostErrorText.text[0] }}</div>
            <div v-if="addPostErrorText.tags">tags: {{ addPostErrorText.tags[0] }}</div>
            <div v-if="addPostErrorText.image">image: {{ addPostErrorText.image[0] }}</div>
          </v-alert>

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
import { axios_request, BASE_URL } from '../../api/post';
import { mapGetters } from "vuex";

import Header from '../components/Header.vue';
import Post from '@/components/Post.vue';


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
      avatar: null,
      posts: [],
      PostForm: {
        title: '',
        text: '',
        tags: [],
        image: null,
      },

      imageRules: [
        value => {
          if (value) return true
          return 'You must choose the image'
        },
      ],
        

      addPostError: false,
      addPostErrorText: '',
    }
  },
  methods: {
    async getUserData() {
      await axios_request('/users/?id=' + this.id).then((res) => {if (res.statusText === 'OK') {
        this.username = res.data.username,
        this.email = res.data.email,
        this.avatar = BASE_URL + res.data.avatar
      }
    }).
    then(() => {
      axios_request('/users/' + this.id + '/posts/').then((res) => {if (res.statusText === 'OK') {
         this.posts = res.data
    }})
    })
    },

    async addPost() {
      if (this.formIsValid()) {
        await axios_request.post('/posts/', {
          title: this.PostForm.title,
          text: this.PostForm.text,
          tags: JSON.stringify(this.PostForm.tags.map((tag) => { return tag.replace(/\s+/g, ' ').trim() }).filter((tag) => { return tag !== '' })),
          image: this.PostForm.image[0]
        }, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('token'),
          }
        })
        .then((res) => {
          if (res.status === 201) {
            this.closeForm()
            this.PostForm.title = '',
            this.PostForm.text = '',
            this.PostForm.tags = '',
            this.PostForm.image = null,
            this.addPostError = false,
            this.addPostErrorText = '',
            this.getUserData()
          }
          }
        )
        .catch((res) => {
          this.addPostError = true,
          this.addPostErrorText = res.response.data
      })
    }
  },

    showUserActions() {
      return this.id === this.$store.getters.getUserId;
    },

    openPostAddForm(){
      this.$store.commit('updatePostWindow', true);
    },

    closeForm() {
      this.$store.commit('updatePostWindow', false);
    },

    formIsValid() {
      return !!(this.PostForm.title && this.PostForm.text && this.PostForm.tags.length && this.PostForm.image);
    },

    removeChip (item) {
      this.PostForm.tags.splice(this.PostForm.tags.indexOf(item), 1);
    },

    getUsername() {
      return this.username;
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

  #user-btns {
    flex-direction: column;
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