<template>
  <v-snackbar
    v-if="currentNotification"
    v-model="snackbar"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :multi-line="true"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
  >
    {{ `Notification from ${currentNotification.sentBy}`}} <br>
    {{ currentNotification.message.length > 30 ? `${currentNotification.message.substr(0, 30)}...`: currentNotification.message}}
    <v-btn
      color="pink"
      flat
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'Pex Notification',
    data () {
      return {
        snackbar: null,
        y: 'top',
        x: 'right',
        mode: 'multi-line',
        timeout: 6000
      }
    },
    computed: {
      ...mapState('auth', ['notification']),
      currentNotification () {
        return this.notification ? this.notification[0] : null
      }
    },
    watch: {
      currentNotification (val) {
        if (this.currentNotification) {
          this.snackbar = true
        }
      },
      snackbar () {
        if (!this.snackbar) {
          // when one notificaiton is hidden, bump it off the list
          // If there is another one, then it'll now show
          this.$nextTick(() => {
            // do it after the UI updates for the existing one
            this.notificationProcessed()
          })
        }
      }
    },
    methods: {
      ...mapMutations('auth', ['notificationProcessed'])
    }
  }
</script>
