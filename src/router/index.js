import Vue from 'vue';
import Router from 'vue-router';
import LeftTabToolbar from '@/components/shared/LeftTabToolbar';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import About from '@/components/About';
import Contact from '@/components/Contact';
import ServiceFailureForm from '@/components/ServiceFailureForm';
import ServiceFailures from '@/components/ServiceFailures';
import ServiceFailureDetails from '@/components/ServiceFailureDetails';
import Footer from '@/components/shared/Footer';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/users/login',
    },
    {
      path: '/users/login',
      name: 'Login',
      components: {
        content: Login,
        footer: Footer,
      },
      meta: {
        authNotRequired: true,
      },
    },
    {
      path: '/Home',
      redirect: '/Home/Dashboard',
      name: 'Home',
      components: {
        leftTab: LeftTabToolbar,
        content: Home,
        footer: Footer,
      },
      children: [
        {
          name: 'Dashboard',
          path: 'Dashboard',
          components: {
            tabContent: Dashboard,
          },
        },
        {
          name: 'About',
          path: 'About',
          components: {
            tabContent: About,
          },
        },
        {
          name: 'Contact',
          path: 'Contact',
          components: {
            tabContent: Contact,
          },
        },
      ],
    },
    {
      path: '/submit-service-failure',
      name: 'ServiceFailureForm',
      components: {
        leftTab: LeftTabToolbar,
        content: ServiceFailureForm,
        footer: Footer,
      },
    }, {
      path: '/service-failures',
      name: 'ServiceFailures',
      components: {
        leftTab: LeftTabToolbar,
        content: ServiceFailures,
        footer: Footer,
      },
    }, {
      path: '/service-failure/:SFid',
      name: 'aServiceFailure',
      props: {
        leftTab: false,
        content: true,
        footer: false,
      },
      components: {
        leftTab: LeftTabToolbar,
        content: ServiceFailureDetails,
        footer: Footer,
      },
    },
  ],
});
