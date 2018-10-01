<template>
  <div>
    <v-content>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card v-if="dataLoaded">
            <v-list two-line>
              <template>
                <v-subheader>
                  Service Failures
                </v-subheader>
                <v-divider>
                </v-divider>
                <v-list-tile v-for="sf in serviceFailures" @click="goToRoute(sf._id)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ sf.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ sf.description }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
          <div v-else>
            <h1>
              Loading Data...
            </h1>
          </div>
        </v-flex>
      </v-layout>
    </v-content>
  </div>
</template>

<script>
  export default {
    name: 'ServiceFailures',
    data() {
      return {
        dataLoaded: false,
        serviceFailures: [],
        currentUser: null,
      }
    },
    mounted() {
      this.fetchServiceFailures();
    },
    methods: {
      // TODO What does async do?
      async fetchServiceFailures() {
        const token = window.localStorage.getItem('auth');
        return this.axios({
          method: 'get',
          url: 'http://localhost:8081/all-service-failures',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          }
        }
        ).then((response) => {
          this.dataLoaded = true;
          this.serviceFailures = response.data.serviceFailiures;
          this.currentUser = response.data;
        }).catch(() => {
          alert('Error!')
        });
      },
      goToRoute(SFid) {
        this.$router.push({ name: 'aServiceFailure', params: { SFid: SFid } });
      }
    }
  }
</script>
