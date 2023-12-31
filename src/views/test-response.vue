<template>
  <div>
    <div class="row justify-between items-center">
      <breadcrumbs-menu class="q-mb-xl"/>
      <q-no-ssr>
        <test-timer class="q-mb-md" v-if="isStartTest" :timer-value="selectSubtest.necessary_time" @stop="onSubmit()"/>
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
      <div v-if="!isStartTest" class="card test__shadow">
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
              <div class="card test__shadow">
                <div class="text-h2 text-bold text-center q-mb-xl">
                  {{question.name}}
                </div>
                <div class="test__cover q-mb-md" v-if="question.question_img">
                  <img :src="question.question_img" alt="">
                </div>
                <div class="row">
                  <div
                    v-for="ans in question.answer"
                    :key="`answer-${ans.id+index}`"
                    :class="['q-mb-sm', ans.answer_img ? 'col-12 col-sm-6  col-lg-4 q-px-sm': 'col-12']"
                  >
                    <template v-if="question.type_question">
                      <q-checkbox
                        :val="ans.id"
                        v-model="test.answers[question.id].answers"
                        class="full-width"
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
                      <q-radio v-model="test.answers[question.id].answers" :val="ans.id" class="full-width">
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
                </div>
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
            <div class="test__pagination">
              <span
                v-for="(question, index) in selectSubtest.question"
                :key="`pagination_${index}.${question.id}`"
                :class="['test__pagination--item text-weight-medium', activeSlide === index&& 'active']"
              >
                {{ index +1 }}
              </span>
            </div>
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
    if (test?.subtest[test?.active_subtest]?.id) {
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
    }
  },
  components: { TestTimer, BreadcrumbsMenu, Splide, SplideSlide },
  data () {
    return {
      test: {},
      showLoaderTest: false,
      isStartTest: false,
      slideOptions: {
        hasTrack: false,
        drag: false,
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
    selectSubtest () {
      return this.$store.state.test.select_subtest || {}
    },
    disableButton () {
      const question = this.selectSubtest?.question
      if (question && !question[this.activeSlide]?.obligatory) {
        return false
      }
      const answers = this.test.answers[this.selectSubtest?.question[this.activeSlide].id].answers
      if (Number(answers)) return Number(answers) && !question
      return question && !answers.length
    }
  },
  watch: {
    '$store.state.test': {
      immediate: true,
      handler (to) {
        this.test = this.$store.state.test || {}
      }
    },
    '$route.name': {
      immediate: true,
      handler (to) {
        if (process.env.CLIENT && to.includes('Response')) this.getSubTest()
      }
    }
  },
  methods: {
    getSubTest () {
      this.showLoaderTest = true
      if (this.test.subtest[this.test.active_subtest]?.id) {
        app.getSubTest(this.test.subtest[this.test.active_subtest]?.id).then((data) => {
          const answers = {}
          data.question.forEach(question => {
            answers[question.id] = { id: question.id, answers: [] }
          })
          this.$store.dispatch('updateTest', { ...this.test, answers, select_subtest: data })
          this.$nextTick(() => {
            this.isStartTest = this.test.select_subtest.description === ''
          })
          this.showLoaderTest = false
        }).catch((error) => {
          this.showLoaderTest = true
          this.$store.dispatch('showError', error)
        })
      } else {
        this.next('allTests')
      }
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
    destructuringResponses (obj) {
      const array = []
      for (const key in obj) {
        if (Array.isArray(obj[key].answers)) {
          array.push(obj[key])
        } else {
          array.push({ id: obj[key].id, answers: [obj[key].answers] })
        }
      }
      return array
    },
    onSubmit () {
      app.pushAnswer({ ...this.test, answers: this.destructuringResponses(this.test.answers) }).then((data) => {
        this.$store.dispatch('updateTest', { ...this.test, active_subtest: this.test.active_subtest + 1, attempt: data.id })
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
