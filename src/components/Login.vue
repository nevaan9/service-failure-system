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
                @click="sendLogin">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

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
    ...mapActions('auth', ['login']),
    clear() {
      this.$refs.form.reset();
    },
    sendLogin () {
      this.passwordIncorrect = false;
      this.notValidUser = false;
      this.userErrorMessages = [];
      this.passwordErrorMessages = [];
      if (this.$refs.form.validate()) {
        this.login(
          { email: this.email, password: this.password }
          ).then(() => {
            this.$router.push({ name: 'Home' });

        }).catch((err) => {
          if (err.response.data.code === 1) {
            this.notValidUser = true;
            this.userErrorMessages = ['Invalid Email'];
          } else if (err.response.data.code === 2) {
            this.passwordIncorrect = true;
            this.passwordErrorMessages = ['Invalid Password'];
          }
        });
      }
    },
  }
};
</script>
