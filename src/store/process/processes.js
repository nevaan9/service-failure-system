import axios from 'axios';
export default {
  namespaced: true,
  state: {
    allProcesses: [],
    selectedProcess: null,
  },
  getters: {
    getSelectedProcessMembers (state) {
      return function (processID) {
        let members = []
        state.allProcesses.forEach((process) => {
          if (process._id === processID) {
            members = process.members
          }
        });
        return members
      }
    }
  },
  mutations: {
    getProcesses (state, payload) {
      state.allProcesses = payload.data.processes;
    },
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
