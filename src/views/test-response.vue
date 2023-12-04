<template>
  <div class="row justify-between items-center">
    <breadcrumbs-menu/>
    <test-timer class="q-mb-md" v-if="isStartTest" :timer-value="test.select_subtest.necessary_time"/>
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
        {{test.select_subtest.description}}
      </div>
      <div class="flex justify-end">
        <q-btn class="q-px-xl" color="primary" @click="startTest">Начать</q-btn>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12 col-sm-11 col-md-10">
        <Splide
          class="test__shadow q-mb-xl"
          ref="reviews"
          :options="slideOptions"
        >
          <SplideSlide
            v-for="(question, index) in test.select_subtest.question"
            :key="`question-${question.id}`"
          >
            <div class="text-h2 text-bold text-center q-mb-xl">
              {{question.name}}
            </div>
            <div class="test__cover" v-if="question.question_img">
              <img :src="question.question_img" alt="">
            </div>
            <template v-if="question.type_question">
              <q-checkbox
                v-for="ans in question.answer"
                :key="`answer-${ans.id+index}`"
                :val="ans.id"
                v-model="test.answers[question.id].answers"
                @toggle="changeAnswer(question.id, ans.id)"
                class="full-width q-mb-sm"
              >
                {{ans.name}}
              </q-checkbox>
            </template>
            <template v-else>
              <q-radio v-for="ans in question.answer" :key="`answer-${ans.id}`" :val="ans.id" v-model="test.answers">radio
              </q-radio>
            </template>
          </SplideSlide>
        </Splide>
        <div class="row justify-between">
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
            class="q-px-xl q-py-sm" color="primary" @click="activeSlide >= $refs.reviews?.splide?.length - 1? onSubmit(): changeQuestion('next')"
          >
            Далее
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { app } from 'src/services'
import BreadcrumbsMenu from 'components/breadcrumb.vue'
import TestTimer from 'components/timer.vue'

export default {
  name: 'test-response',
  components: { TestTimer, BreadcrumbsMenu, Splide, SplideSlide },
  data () {
    return {
      showLoaderTest: false,
      isStartTest: true,
      tools: { prevBtn: null, nextBtn: null },
      test: null,
      slideOptions: {
        hasTrack: false,
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
      selectAnswer: [],
      activeSlide: 0
    }
  },
  created () {
    this.test = this.$store.state.test
    if (this.test.subtest[this.test.active_subtest]?.id) {
      this.getSubTest()
    } else {
      this.next('allTests')
    }
  },
  computed: {},
  methods: {
    reinitializationResponses () {
      this.test.select_subtest.question.forEach((question) => {
        this.test.answers[question.id] = { id: Number(question.id), answers: [] }
      })
    },
    getSubTest () {
      app.getSubTest(this.test.subtest[this.test.active_subtest]?.id).then((data) => {
        this.$store.dispatch('updateTest', { ...this.test, select_subtest: data })
        this.$nextTick(() => {
          this.test = this.$store.state.test
          this.isStartTest = this.test.select_subtest.description === ''
          this.reinitializationResponses()
        })
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
    changeAnswer (question, answer) {
      if (this.test.answers[question]) {
        const index = this.test.answers[question].answers.findIndex((id) => id === answer)
        if (index === -1) {
          this.test.answers[question].answers.push(answer)
        } else {
          this.test.answers[question].answers.splice(index, 1)
        }
      } else {
        this.test.answers[question] = {
          id: question,
          answers: [answer]
        }
      }
    },
    onSubmit () {
      app.pushAnswer({ ...this.test, answers: Object.values(this.test.answers) }).then((data) => {
        this.$store.dispatch('updateTest', { ...this.test, active_subtest: this.test.active_subtest + 1, attempt: data.id })
        this.activeSlide = 0
        this.test = this.$store.state.test
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
        this.$router.push(this.$route.path.replace('response', 'finale'))
      }
    }
  }
}
</script>
