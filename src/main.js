// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router';

// Use Vuetify
Vue.use(Vuetify);

// Use Axios
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
