<template>
  <div class="wrapper">
    <div class="container full-height">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
@import "src/assets/css/index.scss";
@import '@splidejs/vue-splide/css';
</style>
