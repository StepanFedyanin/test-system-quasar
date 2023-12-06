<template>
    <div
        class="loader"
        v-if="showLoaderTest"
    >
        <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="primary"
            class="q-ma-md"
        />
    </div>
  <template v-else>
    <router-view class="q-pb-lg"/>
  </template>
</template>

<script>

import { app } from 'src/services'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'test',
  // components: { HistoryPage },
  data () {
    return {
      test: {},
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
      app.getTestForId(this.test?.test).then(data => {
        this.$store.dispatch('updateTest', this.$helpers.removeKeys({ ...this.test, ...data }, ['id']))
        this.$nextTick(() => {
          this.test = this.$store.state.test
        })
        this.showLoaderTest = false
      }).catch(() => {
        this.showLoaderTest = false
      })
    }
  }
}
</script>
