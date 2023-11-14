<template>
  <q-circular-progress
    v-if="showLoaderTest"
    indeterminate
    rounded
    size="50px"
    color="primary"
    class="q-ma-md"
  />
  <template v-else>
    <TopBar class="q-mb-lg"/>
    <router-view/>
  </template>
</template>

<script>

// import HistoryPage from '@/components/history-page.vue'
// import app from '@/services/app'

import TopBar from 'components/top-bar.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'test',
  components: { TopBar },
  // components: { HistoryPage },
  data () {
    return {
      test: null,
      showLoaderTest: true
    }
  },
  created () {
    this.test = this.$store.state.test
    this.getTest()
  },
  methods: {
    getTest () {
      this.showLoaderTest = true
      // app.getTestForId(this.test.test_id).then(data => {
      //   this.$store.dispatch('updateTest', { ...this.test, ...data })
      //   this.test = this.$store.state.test
      this.showLoaderTest = false
      // }).catch(err => {
      //   this.$store.dispatch('showError', err)
      //   this.showLoaderTest = false
      // })
    }
  }
}
</script>
