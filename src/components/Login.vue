<template>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.emailValid]"
                  prepend-icon="person"
                  name="login"
                  label="Login"
                  type="text"
                  :error="notValidUser"
                  :error-messages="userErrorMessages"
                />
                <v-text-field
                  v-model="password"
                  :rules="[rules.required]"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  :error="passwordIncorrect"
                  :error-messages="passwordErrorMessages"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      passwordIncorrect: false,
      notValidUser: false,
      userErrorMessages: [],
      passwordErrorMessages: [],
      rules: {
        required: value => !!value || 'Required.',
        // eslint-disable-next-line
        emailValid: email => /.+@.+/.test(email) || 'E-mail must be valid',
      },
    };
  },
  methods: {
    // TODO: Learn what async does!
    async login() {
      this.passwordIncorrect = false;
      this.notValidUser = false;
      this.userErrorMessages = [];
      this.passwordErrorMessages = [];
      if (this.$refs.form.validate()){
        return this.axios.post('http://localhost:8081/users/login',
          {
            email: this.email,
            password: this.password
          },
          {
            'Content-Type': 'application/json',
          },
        ).then((response) => {
          // TODO Learn what local storage does
          window.localStorage.setItem('auth', response.data.token);
          this.$router.push({ name: 'Home' });
        }).catch((error) => {
          if (error.response.data.code === 1) {
            this.notValidUser = true;
            this.userErrorMessages.push('Not a valid username');
          } else if (error.response.data.code === 2)  {
            this.passwordIncorrect = true;
            this.passwordErrorMessages.push('Incorrect password');
          } else {
            this.$router.push({ name: 'Login' });
          }
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
