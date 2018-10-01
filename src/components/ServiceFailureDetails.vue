<template>
  <div>
    <v-content>
      <div>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap v-for="key in Object.keys(serviceFailureDetails)">
            <v-flex xs2>
              <p>{{ key === '_id' ? key.substr(-2) : key }}</p>
            </v-flex>
            <v-flex xs10>
              <p> {{ serviceFailureDetails[key] }} </p>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-content>
  </div>
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
      return this.axios.get(`http://localhost:8081/aServiceFailure/${String(routeString)}`,
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
  },

}
</script>
