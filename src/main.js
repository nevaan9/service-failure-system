// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import auth from './store/auth/auth'
import Process from './store/process/processes'

// Use socket iO
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client'
// import io from 'socket.io-client';

Vue.use(VueSocketio, socketio('http://localhost:8081'));

Vue.config.devtools = true;

// Use Vuetify
Vue.use(Vuetify);
// Use Axios
Vue.use(VueAxios, axios);
// Use vuex
Vue.use(Vuex);
// Import the vuex store
const store = new Vuex.Store({
  modules: {
    auth,
    Process,
  }
});

// add the router guards
router.beforeEach((to, from, next) => {
  // TODO make the if and else one
  if (!to.matched.some(record => record.meta.authNotRequired)) {
    return axios({
      method: 'get',
      url: '/api/current_user',
    }).then((response) => {
        store.commit('auth/logUser', {name: response.data.current_user.name, email: response.data.current_user.email});
        next();
      })
      .catch((err) => {
        return next('/');
      });
  } else {
    // This means someone tried to access the login page

    // If user is alread looged in, redirect to the Home page
    return axios({
      method: 'get',
      url: '/api/current_user',
    }).then((response) => {
      store.commit('auth/logUser', {name: response.data.current_user.name, email: response.data.current_user.email});
      next('/Home/Dashboard');
    }).catch((err) => {
        return next();
    });
  }
});


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  sockets:{
    connect: function(){
      console.log('socket connected')
    }
  },
});
