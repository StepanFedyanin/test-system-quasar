<template>
  <TopBar class="q-mb-lg"/>
  <breadcrumbs-menu/>
  <router-view/>
</template>

<script>
import TopBar from 'components/top-bar.vue'
import BreadcrumbsMenu from 'components/breadcrumb.vue'

export default {
  name: 'wrapper-all',
  components: { BreadcrumbsMenu, TopBar }
}
</script>
