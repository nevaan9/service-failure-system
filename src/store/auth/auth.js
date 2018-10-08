import axios from 'axios';
export default {
  namespaced: true,
  state: {
    current_user: null,
  },
  getters: {

  },
  mutations: {
    logUser(state, payload) {
      state.current_user = payload;
    },
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
      ).then((res) => {
        commit('logUser', {email: res.data.user.email, name: res.data.user.name})
      }).catch((err) => {
        throw err
      })
    }
  }
}
