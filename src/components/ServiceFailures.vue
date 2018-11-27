<template>
  <v-content fluid fill-height>
    <v-container>
      <v-layout
        row>
        <v-flex
        >
          <v-card
            style="height: 100%; overflow: scroll;"
            v-if="dataLoaded && serviceFailures.length"
          >
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
          <div v-if="!dataLoaded">
            <h1>
              Loading Data...
            </h1>
          </div>
          <div v-if="dataLoaded && !serviceFailures.length">
            <h1>
              No service failiures
            </h1>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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
          url: '/all-service-failures',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          }
        }
        ).then((response) => {
          this.dataLoaded = true;
          this.serviceFailures = response.data.serviceFailiures;
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
