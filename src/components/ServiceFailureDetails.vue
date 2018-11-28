<template>
  <v-content fluid fill-height>
    <div>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap v-for="key in Object.keys(serviceFailureDetails)">
          <v-flex xs2>
            <p>{{ getKeyName(key) }}</p>
          </v-flex>
          <v-flex xs10>
            <p
              v-if="key !== 'failedProcess' && key !== 'sentTo'"
            >
              {{ serviceFailureDetails[key] }}
            </p>
            <p v-if="key === 'failedProcess'">
              {{ serviceFailureDetails[key].name }}
            </p>
            <p v-if="key === 'sentTo'">
              {{ getSentToMembers(serviceFailureDetails[key]) }}
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-content>
</template>

<script>
export default {
  name: 'ServiceFailureDetails',
  props: ['SFid'],
  data() {
    return {
      serviceFailureDetails: [],
      SFis: null,
    }
  },
  mounted() {
    this.SFid = this.$route.params.SFid;
    this.fetchDetails(this.SFid);
  },
  methods: {
    fetchDetails(routeString) {
      return this.axios.get(`/aServiceFailure/${String(routeString)}`,
        {
          'Content-Type': 'application/json'
        }
      ).then((response) => {
        this.serviceFailureDetails = response.data;
      }).catch((error) => {
        console.error(error)
        alert('ERROR!');
      });
    },
    getKeyName (key) {
      if (key === '_id') {
        return 'ID'
      } else if (key === 'failedProcess') {
        return 'Failed Process'
      } else if (key === 'sentTo') {
        return 'Sent to'
      } else if (key === 'name') {
        return 'Submitted by'
      } else {
        return key.charAt(0).toUpperCase() + key.slice(1);
      }
    },
    getSentToMembers (members) {
      const names = [];
      members.forEach(mem => names.push(mem.name));
      return names.length > 1 ? names.join(", ") : names[0];
    }
  },

}
</script>
