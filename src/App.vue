<template>
  <div id="app">
    <div>Hello</div>
    <router-view name="content"/>
    <router-view name="footer"/>
  </div>
</template>

<script>
import './assets/stylesheets/main.css';

export default {
  name: 'App',
};
</script>

<style>
</style>
