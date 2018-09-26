<template>
  <div class="hello">
    <v-content>
      <div>Put stuff here</div>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    source: String,
  },
  data() {
    return {
      drawer: true,
      leftNavItems: [{ name: 'Dashboard', icon: 'dashboard', routeName: 'Home' }, { name: 'Submit Service Failure Request', icon: 'add', routeName: 'ServiceFailureForm' }],
    };
  },
  methods: {
    goToRoute(aRouteString) {
      this.$router.push({
        name: aRouteString,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
