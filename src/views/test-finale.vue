<template>
  <div>
    <breadcrumbs-menu/>
    <modal-wrapper v-model="showOfferAuth">
      <div class="row">
        <span class="text-center col-12 q-mb-md text-h3 text-primary">Сохранить результат?</span>
        <div class="col-12 row justify-between">
          <q-btn class="col-5 col-sm-4 col-lg-3" flat @click="showOfferAuth = !showOfferAuth">Нет</q-btn>
          <q-btn class="col-5 col-sm-4 col-lg-3" color="primary" @click="next('auth')">Да</q-btn>
        </div>
      </div>
    </modal-wrapper>
    <div class="test q-pb-xl">
      <div class="description q-mb-lg">
        Внимание! Результаты и интерпретации, полученные без участия специалистов, не следует воспринимать слишком
        серьезно. Диагностическую ценность имеют только исследования, проведенные <span
        class="description__selected">профессиональным психологом</span>.
      </div>
      <div v-if="!$route.params?.id" class="row items-center q-gutter-md">
        <div class="description description__bg description__point text-bold q-py-xs q-px-lg cursor-pointer"
             @click="copyUrl()">
          "Ссылка на результаты теста": <span class="q-px-sm text-primary text-weight-light"
                                              ref="attemptUrl"> ссылка</span>
        </div>
        <div ref="alertUser" class="test__message text-h5 text-secondary">
          Ваша ссылка скопирована!
        </div>
      </div>
    </div>
    <div class="card card__border q-px-xl q-py-lg q-mb-xl">
      <div v-for="(conclusion,index) in conclusions.data" :key="`conclusion_${index}`"
           class="row text-secondary q-mb-lg q-gutter-md items-center">
        <div class="col-sm-3 col-md-2">{{ conclusion.title }}</div>
        <div class="card__progress col-10 col-sm-grow">
          <span :style="{width: `${conclusion.fin_scores / conclusion.max_score * 100}%`}">
            {{ conclusion.fin_scores }}
          </span>
        </div>
        <div class="text-bold text-h3 col-sm-auto">{{ conclusion.max_score }}</div>
      </div>
    </div>
    <div v-for="(conclusion,index) in conclusions.data" :key="`conclusion_description_${index}`"
         class="description description__point q-mb-lg">
      <div class="text-bold text-h2 q-mb-md">{{ conclusion.title }}</div>
      <span class="description__paragraph">
         {{ conclusion.description }}
      </span>
    </div>
  </div>
</template>

<script>
import { app } from 'src/services'
import BreadcrumbsMenu from 'components/breadcrumb.vue'
import ModalWrapper from 'components/modal.vue'

export default {
  name: 'test-finale',
  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    if (!process.env.SERVER) { return null }
    app.getAttemptById(currentRoute.params.attempt).then((data) => {
      store.dispatch('data', { key: 'conclusions', data })
    }).catch(error => {
      store.dispatch('showError', error)
    })
  },
  components: { ModalWrapper, BreadcrumbsMenu },
  data () {
    return {
      showOfferAuth: false,
      user: {}
    }
  },
  created () {
    this.user = this.$store.state.user
    this.showOfferAuth = !this.user.id
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler (to) {
        if (process.env.CLIENT && to === 'testFinale') this.getConclusion()
      }
    }
  },
  computed: {
    test () {
      return this.$store.state.test
    },
    conclusions () {
      return this.$store.state.data?.conclusions || []
    }
  },
  methods: {
    getConclusion () {
      if (this.test.attempt) {
        app.getAttemptById(this.test.attempt).then((data) => {
          this.$store.dispatch('data', { key: 'conclusions', data })
        }).catch(error => {
          this.$store.dispatch('showError', error)
        })
      }
    },
    copyUrl () {
      if (process.env.CLIENT) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(this.conclusions.url)
            .then(() => {
              this.$refs.alertUser.style.transform = 'scale(1)'
              setTimeout(() => {
                this.$refs.alertUser.style.transform = 'scale(0)'
              }, 3000)
            })
        } else {
          const input = document.createElement('input')
          input.value = this.conclusions.url
          document.body.appendChild(input)
          input.select()
          document.execCommand('copy')
          document.body.removeChild(input)
          this.$refs.alertUser.style.transform = 'scale(1)'
          setTimeout(() => {
            this.$refs.alertUser.style.transform = 'scale(0)'
          }, 3000)
        }
      }
    },
    next (name) {
      this.$router.push({ name: name || 'allTests' })
    }
  }
}
</script>
