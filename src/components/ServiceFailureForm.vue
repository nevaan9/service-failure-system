<template>
  <div>
      <v-content>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              outline
              v-model="name"
              :rules="nameRules"
              :counter="25"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              outline
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-textarea
              outline
              :rules="descriptionRules"
              v-model="description"
              :counter="1000"
              label="Description"
              required
            ></v-textarea>
          </v-form>
          <v-select
            required
            outline
            :items="items"
            v-model="processFailure"
            label="Process Where Failure Originated"
          ></v-select>
          <v-select
            outline
            :items="items"
            v-model="serviceLevelCategory"
            label="Service Level Category"
          ></v-select>
          <v-select
            outline
            :items="items"
            v-model="value"
            label="Select Item"
            multiple
          >
            <template
              slot="selection"
              slot-scope="{ item, index }"
            >
              <v-chip v-for="n in 3" v-if="index === n-1" v-bind:key="n">
                <span>{{ item }}</span>
              </v-chip>
              <span
                v-if="index === 3"
                class="grey--text caption"
              >(+{{ value.length - 3 }} others)</span>
            </template>
          </v-select>
          <v-date-picker
            outline
            v-model="date"
            :show-current="currentDate"
            color="blue"
          />
          <v-btn
            :disabled="!valid"
            @click="submit">
            submit
          </v-btn>
          <v-btn @click="clear">
            clear
          </v-btn>
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
    items: ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar'],
    value: ['foo', 'bar', 'fizz'],
    date: null,
    currentDate: null,
    serviceLevelCategory: null,
    processFailure: null,
  }),
  created() {
    const dateOb = new Date();
    // eslint-disable-next-line
    this.currentDate = String(dateOb.getUTCFullYear()) + '-0' + String(dateOb.getUTCMonth() + 1) + '-' + String(dateOb.getUTCDate());
    // eslint-disable-next-line
    this.date = String(dateOb.getUTCFullYear()) + '-0' + String(dateOb.getUTCMonth() + 1) + '-' + String(dateOb.getUTCDate());
    this.serviceLevelCategory = this.items[0];
    this.processFailure = this.items[0];
  },
  methods: {
    submit() {
      // This validates the text fields
      if (this.$refs.form.validate()) {
        // Submit the data to the DB
        return this.axios.post('/submit-service-failure',
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
            this.$router.push({ name: 'Dashboard' });

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

<style>

</style>
