<template>
  <v-snackbar
    v-model="snackbar"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
  >
    {{ currentNotification }}
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
        mode: '',
        timeout: 3000
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
