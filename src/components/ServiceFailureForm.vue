<template>
  <div>
      <v-content>
        <v-container fill-height>
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                disabled
                outline
                v-model="name"
                :rules="nameRules"
                :counter="25"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                disabled
                outline
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                disabled
                outline
                v-model="date"
                label="Date"
                required
              ></v-text-field>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-textarea
                  outline
                  :rules="descriptionRules"
                  v-model="description"
                  :counter="1000"
                  label="Description"
                  required
                ></v-textarea>
                <v-select
                  required
                  outline
                  item-text="name"
                  item-value="_id"
                  v-model="selectedProcessFailure"
                  :items="allProcesses"
                  label="Process Where Failure Originated"
                  :error="selectProcessError"
                  :error-messages="errorMessage"
                ></v-select>
              </v-form>
              <v-select
                outline
                :items="members"
                item-text="name"
                item-value="_id"
                v-model="selectedMember"
                label="Select Members to CC"
                multiple
                :error="selectMemberError"
                :error-messages="errorMessage"
              >
                <template
                  slot="selection"
                  slot-scope="{ item, index }"
                >
                  <v-chip v-for="n in 3" v-if="index === n-1" v-bind:key="n">
                    <span>{{ item.name }}</span>
                  </v-chip>
                  <span
                    v-if="index === 3"
                    class="grey--text caption"
                  >(+{{ value.length - 3 }} others)</span>
                </template>
              </v-select>
              <v-btn
                @click="submit">
                submit
              </v-btn>
              <v-btn @click="clear">
                clear
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'ServiceRequestForm',
  data: () => ({
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
    selectedMember: [],
    date: null,
    selectedProcessFailure: "",
    currentuser: null,
    selectProcessError: false,
    selectMemberError: false,
    errorMessage: []
  }),
  watch: {
    selectedPF () {
      this.selectedMember = []
    }
  },
  created() {
    const dateOb = new Date();
    const month = dateOb.getUTCMonth() + 1 < 10 ? '-0' + (dateOb.getUTCMonth() + 1).toString() : '-' + (dateOb.getUTCMonth() + 1).toString();
    // eslint-disable-next-line
    this.date = dateOb.getUTCFullYear().toString() + month + '-' + dateOb.getUTCDate().toString();
    console.log(this.date);
    this.getCurrentUser();
    this.getProcesses();
  },
  computed: {
    ...mapState('auth', ['current_user']),
    ...mapState('Process', ['allProcesses']),
    ...mapState('Process', ['selectedProcess']),
    ...mapGetters('Process', ['getSelectedProcessMembers']),
    selectedPF () {
      return this.selectedProcessFailure
    },
    members () {
      return this.getSelectedProcessMembers(this.selectedPF);
    }
  },
  methods: {
    ...mapActions('Process', ['getProcesses']),
    submit() {
      // This validates the text fields
      if (this.$refs.form.validate() && this.validateSelect()) {
        // Submit the data to the DB
        return this.axios.post('/submit-service-failure',
          {
            name: this.name,
            email: this.email,
            description: this.description,
            failedProcess: this.selectedProcessFailure,
            notifyMembers: this.selectedMember
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
      return false
    },
    clear() {
      this.$refs.form.reset();
    },
    getCurrentUser() {
      this.name = this.current_user.name;
      this.email = this.current_user.email;
    },
    validateSelect() {
      this.errorMessage = []
      this.selectProcessError = false
      this.selectMemberError = false
      if (this.selectedProcessFailure && this.selectedMember.length) {
        return true
      } else {
        if (!this.selectedProcessFailure) {
          this.selectProcessError = true
        }

        if (!this.selectedMember.length) {
          this.selectMemberError = true
          this.errorMessage = ['Required Field']
        }
      }
    }
  },
};
</script>

<style>

</style>
