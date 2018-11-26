<template>
  <div>
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">Media card</div>
          <div class="md-subhead">Medium size</div>
        </md-card-header-text>

        <md-card-media md-medium>
          <img src="https://vuematerial.io/assets/examples/card-weather.png" alt="People">
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-badge md-content="1">
          <md-button class="md-icon-button">
            <md-icon>notifications</md-icon>
          </md-button>
        </md-badge>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
  export default {
    name: 'Media'
  }
</script>

<style scoped>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
