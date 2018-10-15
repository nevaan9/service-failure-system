import axios from 'axios';
export default {
  namespaced: true,
  state: {
    allProcesses: [],
  },
  getters: {

  },
  mutations: {
    getProcesses (state, payload) {
      state.allProcesses = payload.data.processes;
    },
    getProcessMembers(state, payload) {

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
    },
    getProcessMembers ({ commit }) {

    }
  }
}
