<template>
  <div class="wrapper">
    <div class="container full-height">
      <router-view/>
      <AppError />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AppError from 'components/app-error.vue'

export default defineComponent({
  name: 'App',
  components: { AppError }
})
</script>

<style>
@import "src/assets/css/index.scss";
@import '@splidejs/vue-splide/css';
</style>
