<template>
  <breadcrumbs-menu/>
  <div class="test q-pb-xl">
    <div class="description q-mb-lg">
      Внимание! Результаты и интерпретации, полученные без участия специалистов, не следует воспринимать слишком
      серьезно. Диагностическую ценность имеют только исследования, проведенные <span
      class="description__selected">профессиональным психологом</span>.
    </div>
    <div class="description description__point text-bold q-py-xs row items-center">
      "Ссылка на результаты теста": <span class="text-">Ссылка</span>
    </div>
  </div>
  <div class="card card__border q-px-xl q-py-lg q-mb-xl">
    <div v-for="(conclusion,index) in conclusions" :key="`conclusion_${index}`">
      <div class="text-bold text-h2 q-mb-lg">{{ conclusion.title }}</div>
      <div v-for="(data,index) in conclusion.result" :key="`data_${data+index}`"
           class="row justify-between text-secondary items-center q-mb-lg">
        <div class="col-auto">{{ data.interp_name }}</div>
        <div class="col-auto row q-gutter-sm">
          <span
            v-for="(index) in 10"
            :key="`point_${index+conclusion.title}`"
            :class="['card__mark', data.percent % 10 > 0&&'card__mark--half' , data.percent  % 10 === 0&&'card__mark--full']"
          />
        </div>
        <div class="col-auto text-bold text-h3">{{ data.percent }}%</div>
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
      app.getAttempById(id).then((data) => {
        this.conclusions = data
      })
    }
  }
}
</script>
