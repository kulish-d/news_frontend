<template>
  <v-row justify="center">
    <v-dialog
      v-model="isOpenRegisterWindow"
      @click:outside="closeForm"
      persistent
      width="1024"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Registration</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-text-field
                  label="Username"
                  required
                  v-model="RegistrationForm.username"
                >
                </v-text-field>
            </v-row>
            <v-row>
                <v-text-field
                  label="Email"
                  required
                  v-model="RegistrationForm.email"
                >
                </v-text-field>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Password"
                  type="password"
                  required
                  hint="latin 8+ symbols: Upper & lower letters + digits + spec"
                  v-model="RegistrationForm.password"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Password (again)"
                  type="password"
                  required
                  v-model="RegistrationForm.password2"
                >
                </v-text-field>
              </v-col>
            </v-row>
              <v-row>
                <v-file-input chips multiple label="Choose your ava"
                  v-model="RegistrationForm.avatar"
                  accept="image/*"
                  hint="not required"
                >
                </v-file-input>
              </v-row>
            <v-row>
              <v-alert
                border="left"
                outlined
                color="red"
                type="warning"
                v-if="RegistrationForm.password !== RegistrationForm.password2"
              >
                Passwords must be equal!
              </v-alert>

              <v-alert
                border="left"
                outlined
                color="red"
                type="warning"
                v-if="!passwordValidator(RegistrationForm.password)"
              >
                Password can't be easy!
              </v-alert>
              <v-alert
                border="left"
                outlined
                color="red"
                type="warning"
                v-if="!emailValidator(RegistrationForm.email)"
              >
                Not valid Email!
              </v-alert>
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
            @click="createUser"
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
  name: 'RegisterForm',
  components: {
  },

  data () {
    return {
      RegistrationForm: {
        username: '',
        email: '',
        password: '',
        password2: '',
        avatar: null,
      },
    }
  },

  methods: {
    printData() {
      console.log(this.RegistrationForm)
    },
    passwordValidator(str) {
      return /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(str);
    },
    emailValidator(str) {
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str);
    },
    createUser() {
      if (this.RegistrationForm.password === this.RegistrationForm.password2
       && this.passwordValidator(this.RegistrationForm.password) && this.emailValidator(this.RegistrationForm.email)) {
        this.$store.dispatch('createUser', this.RegistrationForm)
        .then(() => { 
          this.$store.dispatch('authUser', this.RegistrationForm)})
        .then(() => {
          this.dialog = false
          this.RegistrationForm.username = '',
          this.RegistrationForm.email = '',
          this.RegistrationForm.password = '',
          this.RegistrationForm.password2 = '',
          this.closeForm()
        })
    }
    },

    closeForm() {
      this.$store.commit('updateRegisterWindow', false)
    },
},

  computed: mapGetters(['isAuth', 'isOpenRegisterWindow']),
}
</script>

<style scoped>
  .v-alert {
    margin: 0 10px 10px 0;
  }
</style>