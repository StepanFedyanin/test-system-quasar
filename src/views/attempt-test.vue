<template>
  <top-bar class="q-mb-lg"/>
  <router-view/>
</template>

<script>
import TopBar from 'components/top-bar.vue'

export default {
  name: 'attempt-test',
  components: { TopBar }
}
</script>
