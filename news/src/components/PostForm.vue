<template>
  <v-dialog
    v-model="$store.state.post.postWindow.isOpen"
    @click:outside="closeForm"
    persistent
  >
    <v-card id="add-post-form-card">
      <v-card-title>
        <span>{{ $store.state.post.postWindow.isEdit ? "EDIT" : "NEW POST" }}</span>
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
          <v-file-input label="Choose the image"
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
          v-if="!$store.state.post.postWindow.isEdit"
          v-show="!(this.PostForm.title && this.PostForm.text && this.PostForm.tags.length && this.PostForm.image)"
          text
          type="warning"
          outlined
          title="Pffff.."
        >
        All fields are required!
        </v-alert>

        <v-alert
          v-show="postError"
          text
          type="error"
          outlined
          title="Ooops 0_o"
        >
          <div v-if="postErrorText.title">title: {{ postErrorText.title[0] }}</div>
          <div v-if="postErrorText.text">text: {{ postErrorText.text[0] }}</div>
          <div v-if="postErrorText.tags">tags: {{ postErrorText.tags[0] }}</div>
          <div v-if="postErrorText.image">image: {{ postErrorText.image[0] }}</div>
        </v-alert>

        <v-btn
          v-if="$store.state.post.postWindow.isEdit"
          color="blue-darken-1"
          variant="text"
          @click="edit"
        >
          Save (edit)
        </v-btn>
        <v-btn
          v-else
          color="blue-darken-1"
          variant="text"
          @click="add"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'PostForm',
    data() {
      return {

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

        postError: false,
        postErrorText: '',
      }
    },
    beforeMount() {
      if (this.$store.state.post.postWindow.isEdit) {
        this.PostForm.title = this.getCurrentEditPost.title
        this.PostForm.text = this.getCurrentEditPost.text,
        this.PostForm.tags = this.getCurrentEditPost.tags.map((tag) => { return tag.text })
      }
      else {
        [this.PostForm.title, this.PostForm.text, this.PostForm.tags] = [ '', '', [] ]
      }
    },
    methods: {
      ...mapActions(['addPost', 'editPost', 'fetchPosts']),

      add() {
        if (this.formIsValid()) {
          this.addPost(this.PostForm)
          .catch((res) => {
            this.postError = true,
            this.postErrorText = res.response.data
          })
      }},

      edit() {
          let editForm = new FormData()
          if (this.PostForm.title) editForm.append('title', this.PostForm.title)
          if (this.PostForm.text) editForm.append('text', this.PostForm.text)
          if (this.PostForm.tags) editForm.append('tags',
           JSON.stringify(this.PostForm.tags.map((tag) => { return tag.replace(/\s+/g, ' ').trim() }).filter((tag) => { return tag !== '' })))
          if (this.PostForm.image) editForm.append('image', this.PostForm.image)
          this.editPost(editForm)
          .catch((res) => {
            this.postError = true,
            this.postErrorText = res.response.data
          })
      },

      closeForm() {
          this.postError = false;
          this.$store.commit('updatePostWindow', {isOpen: false});
      },

      formIsValid() {
          return !!(this.PostForm.title && this.PostForm.text && this.PostForm.tags.length && this.PostForm.image);
      },

      removeChip (item) {
          this.PostForm.tags.splice(this.PostForm.tags.indexOf(item), 1);
      },
    },
    computed: mapGetters(['isOpenPostWindow', 'allPosts', 'getCurrentEditPost'])
  }
</script>