<template>
  <div>
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
    <div v-else>
      <template v-if="user.id">
        <div class='flex justify-between items-center q-mb-xl'>
			<breadcrumbs-menu
				:breadcrumbs="[
               { name: 'Главная', route: { name: 'allTests' } },
               { name: test.name, route: { name: 'allTests' } },
               { name: $route.meta.title, route: { name: 'allTests' } },
          ]"/>
          <AppError />
        </div>
        <div class="row items-start justify-between">
          <table v-if="attempts.length!==0" class="card table card__shadow col-8 col-md-3 mb-4 q-mb-md">
            <thead class="text-primary text-weight-medium bg-grey-1">
            <tr class="row">
              <td class="col-6 q-px-md q-py-sm">
                Попытка
              </td>
              <td class="col-6 q-px-md q-py-sm">
                Дата
              </td>
            </tr>
            </thead>
            <tbody>
            <tr class="row cursor-pointer" v-for="(attempt,index) in attempts" :key="`attempt_${attempt.id}`" @click="next('attempt', attempt.id)">
              <td class="col-6 q-px-md q-py-sm">
                {{ index + 1 }} Попытка
              </td>
              <td class="col-6 q-px-md q-py-sm">
                {{attempt.date}}
              </td>
            </tr>
            </tbody>
          </table>
          <div :class="[attempts.length===0?'col-12': 'col-12 col-md-7 col-lg-8']">
            <div class="description description__point q-mb-lg">
              {{ test.author_name }}
            </div>
            <div class="description description__point q-mb-lg">
              {{ test.sdescription }}
            </div>
            <div class="row justify-between">
              <div class="text-primary text-bold text-h3">
                {{ $helpers.stringForNumber(test.count, ['вопрос', 'вопроса', 'вопросов']) }}
              </div>
              <q-btn color="primary" @click="next">Пройти тест</q-btn>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class='flex justify-between items-center q-mb-xl'>
			<breadcrumbs-menu
				:breadcrumbs="[
               { name: 'Главная', route: { name: 'allTests' } },
               { name: test.name, route: { name: 'allTests' } },
               { name: $route.meta.title, route: { name: 'allTests' } },
          ]"/>
          <AppError />
        </div>
        <div class="row justify-between items-center q-mb-lg">
          <div class="text-primary text-bold text-h3">
            {{ $helpers.stringForNumber(test.count, ['вопрос', 'вопроса', 'вопросов']) }}
          </div>
          <q-btn color="primary" @click="next()">Пройти тест</q-btn>
        </div>
        <div class="description description__point q-mb-lg">
          {{ test.author_name }}
        </div>
        <div class="description description__point q-mb-lg">
          {{ test.sdescription }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import BreadcrumbsMenu from 'components/breadcrumb.vue'
import { app } from 'src/services'
import { helpers } from 'src/utils/helpers'
import AppError from 'components/app-error.vue'

export default {
  name: 'test-description',
  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    if (!process.env.SERVER) { return null }
    await app.getTestForId(currentRoute.params.id).then((res) => {
		store.dispatch('initTest', helpers.removeKeys({ ...res, test: res.id, active_subtest: 0 }, ['id']))
    }).catch((error) => {
      store.dispatch('showError', error)
    })
  },
  components: { AppError, BreadcrumbsMenu },
  data () {
    return {
      attempts: [],
      longDescription: true,
      user: null,
      showLoaderTest: false
    }
  },
  computed: {
    test () {
      return this.$store.state.test || {}
    }
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler (to) {
        if (process.env.CLIENT && to.includes('Description')) this.getTest()
      }
    }
  },
  created () {
    this.user = this.$store.state.user
    if (this.user.id) {
      this.getAttempt()
    }
  },
  methods: {
    getTest () {
      this.showLoaderTest = true
      app.getTestForId(this.$route.params.id).then((res) => {
        this.showLoaderTest = false
		  this.$store.dispatch('initTest', helpers.removeKeys({ ...res, test: res.id, active_subtest: 0 }, ['id']))
      }).catch((error) => {
        this.showLoaderTest = false
        this.$store.dispatch('showError', error)
      })
    },
    getAttempt () {
      this.showLoaderTest = true
      app.getAttemptForTest(this.test.test).then(data => {
        this.attempts = data
        this.showLoaderTest = false
      }).catch(() => {
        this.showLoaderTest = false
      })
    },
    next (name, params) {
      if (params) {
        this.$router.push({ name, params: { attempt: params } })
      } else {
        this.$store.dispatch('clearTimer')
        this.$nextTick(() => {
          this.$router.push(`${this.$route.path}/response`)
        })
      }
    }
  }
}
</script>
