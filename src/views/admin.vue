<template>
  <div class='admin'>
    <top-bar class="q-mb-lg"/>
    <router-view/>
  </div>
</template>

<script>
import TopBar from 'components/top-bar.vue'

export default {
  name: 'admin-panel',
  components: { TopBar },
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
