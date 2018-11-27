<template>
  <div>
    <!-- This is a notification -->
    <pex-notification></pex-notification>
    <v-navigation-drawer
      clipped
      v-model="drawer"
      app
    >
      <v-list
        dense>
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
        <div :key="logout">
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon>lock</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      fixed
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Pex Service Failure System</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
  import pexNotification from '@/components/shared/pexNotification'
  import { mapState } from 'vuex'
export default {
  name: 'LeftTabToolbar',
  props: {
    source: String,
  },
  components: {
    pexNotification
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
    logout(){
      return this.axios({
        method: 'get',
        url: '/api/logout',
      }).then(() => {
        this.$router.push('/');
        this.$socket.emit('logout', {id: this.currentUserId})
      }).catch(() => {
        // Error
      });
    },
  },
  computed: {
    ...mapState('auth', ['current_user']),
    currentUserId () {
      return this.current_user ? this.current_user.id : null
    }
  },
  mounted() {
    this.$socket.on(`NOTIFICATION-${this.currentUserId}`, (data) => {
      // According to some logic, emit notifications to users!
      this.$notofication({message: data.message, sentBy: data.sentBy })
    });

    this.$socket.emit('login', {id: this.currentUserId})
  }
};
</script>
