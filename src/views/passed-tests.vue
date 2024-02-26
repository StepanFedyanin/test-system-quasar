<template>
  <div>
    <div class='flex justify-between items-center q-mb-xl'>
      <breadcrumbs-menu
		:breadcrumbs="[
			{ name: $route.meta.title, route: { name: 'allTests' } },
		]"
	/>
      <AppError />
    </div>
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
    <div v-else-if="attempts.length" class="q-mb-md">
      <router-link  v-for="attempt in attempts" :key="`attempt_${attempt.test_id}`" :to="{name:'testPassed' , params: {id:attempt.test_id }}" class="card description__point test__passed items-center q-mb-md">
        {{ attempt.test }}
        <span class="text-primary row items-center">
              {{ $helpers.stringForNumber(attempt.count, ['попытка', 'попытки', 'попыток']) }}
              <q-icon color="primary" name="chevron_right"/>
            </span>
      </router-link>
    </div>
    <div v-else class="text-secondary text-h3 text-center">вы еще не проходили тесты</div>
  </div>
</template>

<script>

import BreadcrumbsMenu from 'components/breadcrumb.vue'
import { app } from 'src/services'
import AppError from 'components/app-error.vue'

export default {
  name: 'passed-test',
  components: { AppError, BreadcrumbsMenu },
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
    next (name, id) {
      if (id) {
        this.$router.push({ name: 'testPassed', params: { id } })
      } else {
        this.$router.push({ name: name || 'passed_tests' })
      }
    }
  }
}
</script>
