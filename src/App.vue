<template>
  <div class="container column full-height">
    <router-view/>
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
</style>
