<template>
  <div>
    <breadcrumbs-menu/>
    <div
      v-if="showLoaderTests"
      class="loader"
    >
      <q-circular-progress
        indeterminate
        rounded
        size="50px"
        color="primary"
        class="q-ma-md"
      />
    </div>
    <div v-else class="q-mb-md">
      <q-btn
        class="card full-width description__point"
        align="between"
        flat
        v-for="attempt in attempts" :key="`attempt_${attempt.test_id}`"
        @click="next('testPassed', attempt.test_id)"
      >
        {{ attempt.test }}
        <div class="text-primary row items-center">
          {{ $helpers.stringForNumber(attempt.count, ['попытка', 'попытки', 'попыток']) }}
          <q-icon color="primary" name="chevron_right"/>
        </div>
      </q-btn>
    </div>
  </div>
</template>

<script>

import BreadcrumbsMenu from 'components/breadcrumb.vue'
import { app } from 'src/services'

export default {
  name: 'passed-test',
  components: { BreadcrumbsMenu },
  data () {
    return {
      attempts: [],
      showLoaderTests: false
    }
  },
  created () {
    this.getAttempt()
  },
  methods: {
    getAttempt () {
      this.showLoaderTests = true
      app.getAttemptForUser().then((data) => {
        this.showLoaderTests = false
        this.attempts = data
      }).catch(() => {
        this.showLoaderTests = false
      })
    },
    next (name, params) {
      if (params) {
        this.$store.dispatch('addTest', params)
      }
      this.$router.push({ name: name || 'passed_tests' })
    }
  }
}
</script>
