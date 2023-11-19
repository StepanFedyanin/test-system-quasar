<template>
    <TopBar class="q-mb-lg"/>
    <router-view/>
</template>

<script>
import TopBar from 'components/top-bar.vue'

export default {
  name: 'wrapper-all',
  components: { TopBar }
}
</script>
