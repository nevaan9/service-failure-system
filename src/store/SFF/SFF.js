import axios from 'axios';
export default {
  namespaced: true,
  state: {
    processes: []
  },
  getters: {

  },
  mutations: {
    getProcesses (state, payload) {
      state.processes = payload.data.processes;
    }
  },
  actions: {
    getProcesses ({ commit }) {
      return axios.get('http://localhost:8081/all-processes', (err, processes) => {
      }).then((res) => {
        commit('getProcesses', res)
      }).catch((err) => {
        throw err
      });
    }
  }
}
