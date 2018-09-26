import Vue from 'vue';
import Router from 'vue-router';
import LeftTabToolbar from '@/components/shared/LeftTabToolbar';
import Home from '@/components/Home';
import ServiceFailureForm from '@/components/ServiceFailureForm';
import Footer from '@/components/shared/Footer';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        leftTab: LeftTabToolbar,
        content: Home,
        footer: Footer,
      },
    },
    {
      path: '/submit-service-failure',
      name: 'ServiceFailureForm',
      components: {
        leftTab: LeftTabToolbar,
        content: ServiceFailureForm,
        footer: Footer,
      },
    },
  ],
});
