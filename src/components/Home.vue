<template>
  <v-content fluid fill-height>
      <v-container fluid fill-height>
        <v-layout fluid fill-height row>
          <v-flex xs12>
            <v-tabs
              color="blue"
              dark
              slider-color="green lighten-3">
              <v-tab
                v-for="tabItem in tabItems"
                :key="tabItem"
                ripple
                @click="directRouteTo(tabItem)"
              >
                {{ tabItem }}
              </v-tab>
            </v-tabs>

            <!--Render the tab content-->
            <router-view name="tabContent"></router-view>
          </v-flex>
        </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      tabItems: ['Dashboard', 'About', 'Contact'],
    };
  },
  methods: {
    directRouteTo(routeString) {
      this.$router.push({
        name: routeString,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
