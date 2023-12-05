<template>
  <div>
    <div>
      <template v-if="user.id">
        <breadcrumbs-menu/>
        <div class="row items-start justify-between">
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
          <table v-else-if="attempts.length!==0" class="card table card__shadow col-8 col-md-3 mb-4 q-mb-md">
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
              {{ test.author }}
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
        <div class="row justify-between items-center q-mb-lg">
          <breadcrumbs-menu/>
          <q-btn color="primary" @click="next()">Пройти тест</q-btn>
        </div>
        <div class="description description__point q-mb-lg">
          {{ test.author }}
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

export default {
  name: 'test-description',
  components: { BreadcrumbsMenu },
  data () {
    return {
      test: null,
      attempts: [],
      longDescription: true,
      user: null,
      showLoaderTest: false
    }
  },
  created () {
    this.user = this.$store.state.user
    this.test = this.$store.state.test
    if (this.user.id) {
      this.getAttempt()
    }
  },
  methods: {
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
        this.$router.push({ name, params: { id: params } })
      } else {
        this.$store.dispatch('clearTimer')
        console.log('почему хуйня не работает')
        this.$nextTick(() => {
          this.$router.push({ name: this.$route.path.includes('all_tests') ? 'testResponse' : 'testResponsePassed' })
        })
      }
    }
  }
}
</script>
