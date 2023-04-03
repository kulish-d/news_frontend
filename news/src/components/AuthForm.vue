<template>
  <v-row justify="center">
    <v-dialog
      v-model="isOpenAuthWindow"
      @click:outside="closeForm"
      persistent
      width="600"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Auth</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  required
                  v-model="AuthForm.email"
                >
                </v-text-field>
              </v-col>
              <v-row>
              </v-row>
              <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Password"
                  type="password"
                  required
                  v-model="AuthForm.password"
                >
                </v-text-field>
              </v-col>
              </v-row>
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
            @click="authUser()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
  
  
<script>
  import {mapGetters} from 'vuex';

export default {
  name: 'AuthForm',
  components: {
  },

  data () {
    return {
      AuthForm: {
        email: '',
        password: '',
      }
    }
  },

  methods: {
    printData() {
      console.log(this.AuthForm)
    },
    authUser() {
      this.$store
      .dispatch('authUser', this.AuthForm)
      .then(() => {
        this.AuthForm.email = '',
        this.AuthForm.password = '',
        this.closeForm()
    })
      },
    
    closeForm() {
      this.$store.commit('updateAuthWindow', false)
    }

  },
  computed: mapGetters(['isAuth', 'isOpenAuthWindow']),

}
  
</script>
  
<style scoped>

</style>