<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        width="1024"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            id="head-btn-auth"
            color="black"
            elevation="15"
            large
            
            v-bind="attrs"
            v-on="on"
          >
            Sign In
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Auth</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="10">
                  <v-text-field
                    label="Email"
                    required
                    v-model="AuthForm.email"
                  >
                  
                  </v-text-field>
                </v-col>
                <v-row>
                <v-col cols="10">
                  <v-text-field
                    label="Username"
                    required
                    v-model="AuthForm.username"
                  >
                  
                  </v-text-field>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="10">
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
  
  export default {
    name: 'AuthForm',
    components: {
    },
  
    data () {
      return {
        dialog: false,
        AuthForm: {
          username: '',
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
          this.AuthForm.username = '',
          this.AuthForm.email = '',
          this.AuthForm.password = '',
          console.log('auth!!') 
        )
        }
    },
  
    // mounted() {
    //     this.printData()
    // }
  
  }
  </script>
  
  <style scoped>
    #head-btn-auth {
      margin: 0 15px 24px 34px;
    }
  </style>