<template>
  <breadcrumbs-menu/>
  <q-dialog v-model="offerToRegister" position="top">
    <q-card class="card card__unshadow q-pa-md">
      <q-card-section>

        <div class="text-h3 q-mb-lg">Сохранить результат ?</div>

        <q-space />
        <div class="row q-gutter-lg">
          <q-btn color="primary" @click="next()">Сохранить</q-btn>
          <q-btn color="primary" outline @click="offerToRegister=false">Увидеть результат</q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
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
      <div v-for="(data,index) in conclusion.result" :key="`data_${data+index}`"
           class="row justify-between text-secondary items-center q-mb-lg">
        <div class="col-2">{{ data.interp_name }}</div>
        <div class="col-12 col-sm-8 card__progress">
          <span :style="{width: `calc(${data.percent}% + 15px )`}"/>
        </div>
        <div class="col-1 text-bold text-h3">{{ data.percent }}%</div>
      </div>
    </div>
  </div>
  <div v-for="(conclusion,index) in conclusions.data" :key="`conclusion_description_${index}`">
    <div class="description description__point q-mb-xl">
      <div class="text-bold text-h2 q-mb-lg">{{ conclusion.title }}</div>
      <span class="description__paragraph" v-for="(data,index2) in conclusion.result"
            :key="`data_description${data+index+index2}`">
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
      conclusions: {},
      offerToRegister: true
    }
  },
  created () {
    this.test = this.$store.state.test
    if (this.test || this.$route.params?.id) {
      this.getConclusion(this.$route.params?.id || this.test.attempt)
    }
    if (this.$route.params?.id) {
      this.offerToRegister = false
    }
  },
  computed: {},
  methods: {
    getConclusion (id) {
      app.getAttempById(id).then((data) => {
        this.conclusions = data
      })
    },
    copyUrl () {
      navigator.clipboard.writeText(this.conclusions.url).then(() => {
        this.$refs.alertUser.style.transform = 'scale(1)'
        setTimeout(() => {
          this.$refs.alertUser.style.transform = 'scale(0)'
        }, 4000)
      })
    },
    next () {
      this.$router.push({ name: 'auth' })
    }
  }
}
</script>
