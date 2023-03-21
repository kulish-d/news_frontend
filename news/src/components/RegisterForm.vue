<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          id="head-btn"
          color="purple darken-1"
          elevation="15"
          large
          v-bind="attrs"
          v-on="on"
        >
          Sign Up
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Registration</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  label="Username"
                  required
                  v-model="RegistrationForm.username"
                >
                
                </v-text-field>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  label="Email"
                  required
                  v-model="RegistrationForm.email"
                >
                
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password"
                  type="password"
                  required
                  v-model="RegistrationForm.password"
                >
                
                </v-text-field>
                <v-text-field
                  label="Password (again)"
                  type="password"
                  required
                  v-model="RegistrationForm.password2"
                >
                </v-text-field>
              </v-col>
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
            @click="createUser()"
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
  name: 'RegisterForm',
  components: {
  },

  data () {
    return {
      dialog: false,
      RegistrationForm: {
        username: '',
        email: '',
        password: '',
        password2: '',
      }
    }
  },

  methods: {
    printData() {
      console.log(this.RegistrationForm)
    },
    createUser() {
      console.log('create start');
      if (this.RegistrationForm.password === this.RegistrationForm.password2) {
      this.$store
      .dispatch('createUser', this.RegistrationForm)
      .then(() =>
        this.dialog = false,
        this.RegistrationForm.username = '',
        this.RegistrationForm.email = '',
        this.RegistrationForm.password = '',
        this.RegistrationForm.password2 = '',
        console.log('created!') 
      )
      }
    }
  },

  mounted() {
      this.printData()
  }

}
</script>

<style scoped>
  #head-btn {
    margin: 15px;
  }
</style>