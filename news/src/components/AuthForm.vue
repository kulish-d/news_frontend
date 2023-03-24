<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
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
            @click="dialog = false"
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
        dialog: false,
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
      .then(() =>
        this.dialog = false,
        this.AuthForm.email = '',
        this.AuthForm.password = '',
        console.log('auth?') 
      )
      }
  },
  computed: mapGetters(['isAuth']),
  
  updated() {
    if (this.isOpen) this.dialog = true;
  },

  props: ['isOpen']

  }
  
</script>
  
<style scoped>
  #head-btn-auth {
    margin: 0 15px 24px 34px;
  }
</style>