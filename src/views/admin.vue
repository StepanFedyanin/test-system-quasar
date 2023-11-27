<template>
  <div class='admin'>
    <top-bar class="q-mb-lg"/>
    <breadcrumbs-menu/>
    <router-view/>
  </div>
</template>

<script>
import TopBar from 'components/top-bar.vue'
import BreadcrumbsMenu from 'components/breadcrumb.vue'

export default {
  name: 'admin-panel',
  components: { BreadcrumbsMenu, TopBar },
  methods: {
    next (params) {
      this.$router.push({ name: params || 'adminTest' })
    }
  }
}
</script>

<style scoped>
@import "src/assets/css/module/admin.scss";
</style>
