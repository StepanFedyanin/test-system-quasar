<template>
  <div class="wrapper">
    <MetaTags
      :route="$route"
      :data="$store.state.meta"
    />
    <div class="container full-height">
      <router-view/>
      <AppError />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AppError from 'components/app-error.vue'
import MetaTags from 'components/meta-tags.vue'
import { app } from 'src/services'

export default defineComponent({
  name: 'App',
  components: { MetaTags, AppError },
  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    app.getMetas().then(res => {
      const meta = {}
      res.forEach(item => { meta[item.key] = item })
      return store.dispatch('setMeta', meta)
    })
  }
})
</script>

<style>
@import "src/assets/css/index.scss";
@import '@splidejs/vue-splide/css';
</style>
