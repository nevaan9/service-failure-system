import store from '@/main.js'

export default {
  install (Vue) {
    Vue.prototype.$notofication = (notificationOptions) => {
      store.commit(`auth/userNotification`, notificationOptions)
    }
  }
}
