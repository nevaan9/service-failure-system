<template>
  <div>
    <v-footer class="footer">
      <span style="margin: auto">&copy;{{ footerTitle }}</span>
    </v-footer>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return {
        footerTitle: 'Nevaan Manakal Perera - 2018'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footer {
    background-color: #2c3e50;
    color: aliceblue;
  }
</style>
