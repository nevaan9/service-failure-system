<template>
  <v-content fluid fill-height>
    <v-container>
      <v-layout
        row>
        <v-flex
        >
          <v-checkbox
            v-model="myServiceFailures"
            label="My Service Failures"
          >
          </v-checkbox>
          <v-card
            v-if="dataLoaded && items.length"
          >
            <v-list two-line>
              <template>
                <v-subheader>
                  Service Failures
                </v-subheader>
                <v-divider>
                </v-divider>
                <v-list-tile v-for="sf in items" @click="goToRoute(sf._id)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ sf.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ sf.description }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
          <template v-if="!dataLoaded">
            <h4>
              Loading Data...
            </h4>
          </template>
          <template v-if="dataLoaded && !items.length">
            <h4>
              No service failiures
            </h4>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'ServiceFailures',
    data() {
      return {
        dataLoaded: false,
        serviceFailures: [],
        currentUser: null,
        assignedBy: [],
        myServiceFailures: false,
        showAllData: true,
        showFilterData: false
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
          this.dataLoaded = true;
          alert('Error!')
        });
      },
      goToRoute(SFid) {
        this.$router.push({ name: 'aServiceFailure', params: { SFid: SFid } });
      }
    },
    computed: {
      ...mapState('auth', ['current_user']),
      items () {
        if (this.showAllData) {
          return this.serviceFailures
        } else if (this.showFilterData) {
          return this.usersServiceFailures
        }
        else return []
      },
      usersServiceFailures () {
        // Get all the
        const set = new Set()
        for (const sf of this.serviceFailures) {
          sf.sentTo.forEach((user) => {
            if (user._id === this.current_user.id) {
              set.add(sf._id)
            }
          })
        }
        return this.serviceFailures.filter(aSF => set.has(aSF._id))
      }
    },
    watch: {
      myServiceFailures (val) {
        if (val) {
          this.showAllData = false
          this.showFilterData = true
        } else {
          this.showAllData = true
          this.showFilterData = false
        }
      }
    }
  }
</script>
