<template>
  <div>
    <div class="row justify-between items-center">
      <breadcrumbs-menu/>
      <q-no-ssr>
        <test-timer class="q-mb-md" v-if="isStartTest" :timer-value="selectSubtest.necessary_time" />
      </q-no-ssr>
    </div>
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
    <div v-else class="test">
      <div v-if="!isStartTest" class="test__shadow">
        <div class="description description__point q-mb-lg">
            {{selectSubtest.description}}
        </div>
        <div class="flex justify-end">
          <q-btn class="q-px-xl" color="primary" @click="startTest">Начать</q-btn>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-12 col-sm-11">
          <Splide
            class=" q-mb-sm"
            ref="reviews"
            :options="slideOptions"
          >
            <SplideSlide
              v-for="(question, index) in selectSubtest.question"
              :key="`question-${question.id}`"
              class="q-pa-lg q-pb-xl"
            >
              <div class="test__shadow">
                <div class="text-h2 text-bold text-center q-mb-xl">
                  {{question.name}}
                </div>
                <div class="test__cover q-mb-md" v-if="question.question_img || index === 0">
                  <!--                <img :src="question.question_img" alt="">-->
                  <img src="data:image/jpeg;base64,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" alt=""/>
                </div>
                <template v-if="question.type_question">
                  <q-checkbox
                    v-for="ans in question.answer"
                    :key="`answer-${ans.id+index}`"
                    :val="ans.id"
                    v-model="test.answers[question.id].answers"
                    class="full-width q-mb-sm"
                  >
                    <template v-if="ans.answer_img">
                      <div class="row items-center justify-between">
                        <div class="col-6 col-sm-5">{{ans.name || index + 1}}</div>
                        <div class="col-6 col-sm-5 q-cover">
                          <img :src="ans.answer_img" alt=""/>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      {{ans.name}}
                    </template>
                  </q-checkbox>
                </template>
                <template v-else>
                  <q-radio v-for="ans in question.answer" :key="`answer-${ans.id}`" :val="ans.id" v-model="test.answers">
                    <template v-if="ans.answer_img">
                      <div class="row items-center justify-between">
                        <div class="col-6 col-sm-5">{{ans.name || index + 1}}</div>
                        <div class="col-6 col-sm-5 q-cover">
                          <img :src="ans.answer_img" alt=""/>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      {{ans.name}}
                    </template>
                  </q-radio>
                </template>
              </div>
            </SplideSlide>
          </Splide>
          <div class="row justify-between q-px-lg">
            <q-btn
              :disable="activeSlide < 1"
              class="q-px-xl q-py-sm"
              color="primary"
              outline
              @click="changeQuestion('prev')"
            >
              Назад
            </q-btn>
            <q-btn
              :disable="disableButton"
              class="q-px-xl q-py-sm" color="primary" @click="activeSlide >= $refs.reviews?.splide?.length - 1? onSubmit(): changeQuestion('next')"
            >
              Далее
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { app } from 'src/services'
import { helpers } from 'src/utils/helpers'
import BreadcrumbsMenu from 'components/breadcrumb.vue'
import TestTimer from 'components/timer.vue'

export default {
  name: 'test-response',
  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    if (!process.env.SERVER) { return null }
    const test = store.state.test
    app.getSubTest(test.subtest[test.active_subtest]?.id).then((data) => {
      const answers = {}
      data.question.forEach(question => {
        answers[question.id] = { id: question.id, answers: [] }
      })
      store.dispatch('updateTest', helpers.removeKeys({
        ...test,
        answers,
        select_subtest: data
      }, ['id']))
    }).catch((error) => {
      store.dispatch('showError', error)
    })
  },
  components: { TestTimer, BreadcrumbsMenu, Splide, SplideSlide },
  data () {
    return {
      showLoaderTest: false,
      isStartTest: false,
      slideOptions: {
        hasTrack: false,
        // drag: false,
        // type: 'loop',
        // rewind      : true,
        start: 0,
        // autoHeight  : true,
        perPage: 1,
        // width       : 800,
        gap: '1rem',
        padding: '2',
        pagination: false,
        // direction   : 'ttb',
        // height      : '100%',
        // heightRatio : 0.6,
        // fixedWidth  : 160,

        // fixedHeight : 220,
        cover: true,
        // focus       : 'center',
        // isNavigation: true,
        cloneStatus: false,
        // arrowPath: '0',
        arrows: false
      },
      activeSlide: 0
    }
  },
  created () {},
  computed: {
    test () {
      return this.$store.state.test
    },
    selectSubtest () {
      return this.$store.state.test.select_subtest || {}
    },
    disableButton () {
      const question = this.selectSubtest?.question
      if (question && !question[this.activeSlide]?.obligatory) {
        return false
      }
      return question && !this.test.answers[this.selectSubtest?.question[this.activeSlide].id].answers.length
    }
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler (to) {
        if (process.env.CLIENT && to === 'testResponse') this.getSubTest()
      }
    }
  },
  methods: {
    getSubTest () {
      this.showLoaderTest = true
      app.getSubTest(this.test.subtest[this.test.active_subtest]?.id).then((data) => {
        const answers = {}
        data.question.forEach(question => {
          answers[question.id] = { id: question.id, answers: [] }
        })
        this.$store.dispatch('updateTest', { ...this.test, answers, select_subtest: data })
        this.$nextTick(() => {
          this.test = this.$store.state.test
          this.isStartTest = this.test.select_subtest.description === ''
        })
        this.showLoaderTest = false
      }).catch((error) => {
        this.showLoaderTest = true
        this.$store.dispatch('showError', error)
      })
    },
    startTest () {
      this.isStartTest = true
    },
    changeQuestion (type, meaning = false) {
      if (meaning) {
        this.activeSlide = type
      } else {
        if (type === 'prev') {
          this.activeSlide -= 1
        } else {
          this.activeSlide += 1
        }
      }
      this.$refs.reviews?.go(this.activeSlide)
    },
    onSubmit () {
      app.pushAnswer({ ...this.test, answers: Object.values(this.test.answers) }).then((data) => {
        this.$store.dispatch('updateTest', { ...this.test, active_subtest: this.test.active_subtest + 1, attempt: data.id })
        this.test = this.$store.state.test
        this.activeSlide = 0
      }).catch((err) => {
        this.$store.dispatch('showError', err)
      }).finally(() => {
        this.showLoaderSending = false
        if (this.test.subtest.length - 1 < this.test.active_subtest) {
          this.next()
        } else {
          this.isStartTest = false
          this.changeQuestion(0, true)
          this.getSubTest()
        }
      })
    },
    next (name) {
      if (name) {
        this.$router.push({ name })
      } else {
        this.$router.push(this.$route.path.replace('response', `finale/${this.test.attempt}`))
      }
    }
  }
}
</script>
