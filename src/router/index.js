import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Footer from '@/components/shared/Footer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        content: Home,
        footer: Footer,
      },
    },
  ],
});
