<template>
  <div>
      <v-content>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="25"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="description"
              :rules="descriptionRules"
              :counter="1000"
              label="Description"
              required
            ></v-text-field>
            <v-btn
              :disabled="!valid"
              @click="submit">
              submit
            </v-btn>
            <v-btn @click="clear">
              clear
            </v-btn>
          </v-form>
        </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'ServiceRequestForm',
  data: () => ({
    valid: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 25) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    description: '',
    descriptionRules: [
      v => !!v || 'Description is required',
      v => (v && v.length <= 1000) || 'Description has to be less than 1000 characters',
    ],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        debugger;
        // Submit the data to the DB
        return this.axios.post('http://localhost:8081/submit-service-failure',
          {
            name: this.name,
            email: this.email,
            description: this.description,
          },
          {
            'Content-Type': 'application/json',
          },
        )
          .then(() => {
            // Redirect to the home page
            this.$router.push({ name: 'Home' });

            // Clear the form
            this.$refs.form.reset();
          })
          .catch((err) => {
            // eslint-disable-next-line
            console.log(err);
          });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
