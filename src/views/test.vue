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
    <router-view/>
  </template>
</template>

<script>

// import HistoryPage from '@/components/history-page.vue'
// import app from '@/services/app'

import { app } from 'src/services'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'test',
  // components: { HistoryPage },
  data () {
    return {
      test: null,
      showLoaderTest: true
    }
  },
  created () {
    console.log()
    this.test = this.$store.state.test
    this.getTest()
  },
  methods: {
    getTest () {
      this.showLoaderTest = true
      app.getTestForId(this.test.test).then(data => {
        this.$store.dispatch('updateTest', this.$helpers.removeKeys({ ...this.test, ...data }, ['id']))
        this.$nextTick(() => {
          this.test = this.$store.state.test
        })
        this.showLoaderTest = false
      }).catch(err => {
        this.$store.dispatch('showError', err)
        this.showLoaderTest = false
      })
    }
  }
}
</script>
