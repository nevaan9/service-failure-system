<template>
  <div>
    <v-navigation-drawer
      absolute
      temporary
      v-model="drawer"
      app>
      <v-list dense>
        <div v-for="aLeftNavItem in leftNavItems" :key="aLeftNavItem.name">
          <v-list-tile @click="goToRoute(aLeftNavItem.routeName)">
            <v-list-tile-action>
              <v-icon>{{ aLeftNavItem.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ aLeftNavItem.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Pex Service Failure System</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'LeftTabToolbar',
  props: {
    source: String,
  },
  data() {
    return {
      drawer: true,
      leftNavItems: [
        { name: 'Dashboard', icon: 'dashboard', routeName: 'Dashboard' },
        { name: 'Submit Service Failure Request', icon: 'add', routeName: 'ServiceFailureForm' },
        {name: 'See All SFR', icon: 'add', routeName: 'ServiceFailures'}
        ],
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
