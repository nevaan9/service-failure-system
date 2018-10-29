import axios from 'axios';
export default {
  namespaced: true,
  state: {
    current_user: null,
    notification: []
  },
  getters: {

  },
  mutations: {
    logUser(state, payload) {
      state.current_user = payload;
    },
    userNotification (state, payload) {
      state.notification.push(payload)
    },
    notificationProcessed (state) {
      state.notification.shift()
    }
  },
  actions: {
    login ({ commit }, payload) {
      return axios.post('http://localhost:8081/users/login',
        {
          email: payload.email,
          password: payload.password
        },
        {
          'Content-Type': 'application/json',
        },
      ).catch((err) => {
        throw err
      });
    }
  }
}
