<template>
  <breadcrumbs-menu/>
  <div class="test q-pb-xl">
    <div class="description q-mb-lg">
      Внимание! Результаты и интерпретации, полученные без участия специалистов, не следует воспринимать слишком
      серьезно. Диагностическую ценность имеют только исследования, проведенные <span
      class="description__selected">профессиональным психологом</span>.
    </div>
    <div v-if="!$route.params?.id" class="row items-center q-gutter-md">
      <div class="description description__bg description__point text-bold q-py-xs q-px-lg cursor-pointer" @click="copyUrl()">
        "Ссылка на результаты теста": <span class="q-px-sm text-primary text-weight-light" ref="attemptUrl"> ссылка</span>
      </div>
      <div ref="alertUser" class="test__message text-h5 text-secondary">
        Ваша ссылка скопирована!
      </div>
    </div>
  </div>
  <div class="card card__border q-px-xl q-py-lg q-mb-xl">
    <div v-for="(conclusion,index) in conclusions.data" :key="`conclusion_${index}`">
      <div class="text-bold text-h2 q-mb-lg">{{ conclusion.title }}</div>
      <div class="card__progress">
        <span/>
      </div>
    </div>
  </div>
  <div v-for="(conclusion,index) in conclusions" :key="`conclusion_description_${index}`">
    <div class="text-bold text-h2 q-mb-lg">{{conclusion.title}}</div>
    <div class="description description__point q-mb-xl">
      <span class="description__paragraph" v-for="(data,index2) in conclusion.result" :key="`data_description${data+index+index2}`">
         {{ data.description }}
      </span>
    </div>
  </div>
</template>

<script>
import { app } from 'src/services'
import BreadcrumbsMenu from 'components/breadcrumb.vue'

export default {
  name: 'test-finale',
  components: { BreadcrumbsMenu },
  data () {
    return {
      test: null,
      conclusions: []
    }
  },
  created () {
    this.test = this.$store.state.test
    if (this.test || this.$route.params?.id) {
      this.getConclusion(this.$route.params?.id || this.test.attempt)
    }
  },
  computed: {
  },
  methods: {
    getConclusion (id) {
      app.getAttemptById(id).then((data) => {
        this.conclusions = data
      })
    },
    copyUrl () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.conclusions.url)
          .then(() => {
            this.$refs.alertUser.style.transform = 'scale(1)'
            setTimeout(() => {
              this.$refs.alertUser.style.transform = 'scale(0)'
            }
            )
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
        })
      }
    }
  }
}
</script>
