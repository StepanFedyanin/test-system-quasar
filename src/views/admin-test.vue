<template>
  <div class="admin q-pb-lg">
    <div class="flex justify-between items-center">
      <breadcrumbs-menu/>
      <q-btn color="primary" class="q-px-lg" @click="next()">
        ко всем тестам
      </q-btn>
    </div>
    <div class="loader" v-if="showLoaderTest">
        <q-circular-progress
          indeterminate
          rounded
          size="50px"
          color="primary"
          class="q-ma-md"
        />
    </div>
    <drop-wrapper titleStyle="text-primary justify-between" class="card card__shadow text-secondary q-pa-md q-mb-lg" :title="`Статус: ${test.status}`">
        <div class="q-mb-sm">Кол-во вопросов: {{test.count_quest}}</div>
        <div class="q-mb-sm">Кол-во шкал: {{test.count_scale}}</div>
        <div class="q-mb-sm">Время: {{test.test_time}} часа</div>
        <div class="q-mb-sm">{{test.author}}</div>
        <div class="q-mb-sm">{{test.sdescription}}</div>
    </drop-wrapper>
    <q-tabs
      v-model="tab"
      dense
      content-class="admin__tabs"
      class="text-secondary row"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab content-class="admin__tab" class="col" name="subtest">Вопросы</q-tab>
      <q-tab content-class="admin__tab" class="col" name="scale">Шкалы</q-tab>
      <q-tab content-class="admin__tab" class="col" name="connection">Ключ</q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" class="card card__border--bottom">
      <q-tab-panel name="subtest" class="admin__panel row">
        <div
          class="loader"
          v-if="showLoaderTab"
        >
          <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="primary"
            class="q-ma-md"
          />
        </div>
        <div v-else v-for="subtest in subtests" :key="`subtest_${subtest.id}`">
          <drop-wrapper titleStyle="text-h4 text-weight-medium text-dark q-gutter-x-md q-mb-md" :title="subtest.name" class="text-secondary q-mb-sm">
            <div class="q-mb-sm">Кол-во вопросов: {{subtest.question.length}}</div>
            <div class="q-mb-sm">Время: {{subtest.necessary_time}}</div>
            <div class="q-mb-sm">{{subtest.description}}</div>
          </drop-wrapper>
          <div v-for="(question, index) in subtest.question" :key="`question_${question.id}`" class="q-mb-md">
            <p class="text-primary q-mb-sm text-weight-medium">{{index + 1}}. {{question.name}}</p>
            <ul class="text-secondary q-pl-md">
              <li v-for="(answer, index2) in question.answer" :key="`answer_${question.id}.${answer.id}`">{{index + 1}}.{{index2 + 1}} {{answer.name}}</li>
            </ul>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="scale" class="admin__panel">
        <div
          class="loader"
          v-if="showLoaderTab"
        >
          <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="primary"
            class="q-ma-md"
          />
        </div>
        <div v-else v-for="(scale, index) in scales" :key="`scale_${index}`" class="q-mb-lg">
          <div class="q-mb-md text-h3 text-weight-medium q-px-md">{{scale.name}}</div>
            <ul class="text-secondary q-pl-md">
              <li class="q-mb-md row items-center" v-for="(interpretation,index2) in scale.interp_data" :key="`interpretations_${index}.${index2}`">
                <span class="text-h4 text-primary text-weight-medium q-pr-md col-2">{{interpretation.start_score}} - {{interpretation.finish_score}}</span>
                <p class="col-10">{{interpretation.name_interp}}</p>
              </li>
            </ul>
        </div>
      </q-tab-panel>
      <q-tab-panel name="connection" class="admin__panel">
        <div
          class="loader"
          v-if="showLoaderTab"
        >
          <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="primary"
            class="q-ma-md"
          />
        </div>
        <div v-else class="q-mb-lg">
          <div v-for="(scale,index) in scales" :key="scale.scale_name+index">
            <div class="q-mb-md text-h3 text-weight-medium">{{scale.scale_name}}</div>
            <ul class="">
              <li class="q-mb-sm" v-for="(keys,index2) in scale.keys" :key="scale.scale_name+index+index2">
                <span class="text-primary text-weight-medium">{{keys.answer_id }}.{{keys.answer_id }}</span> -
                {{ $helpers.stringForNumber(keys.answer_score, ['балл', 'балла', 'баллов']) }}
              </li>
            </ul>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>

import { app } from 'src/services'
import DropWrapper from 'components/drop-wrapper.vue'
import BreadcrumbsMenu from 'components/breadcrumb.vue'

export default {
  name: 'admin-test',
  components: { BreadcrumbsMenu, DropWrapper },
  data () {
    return {
      tab: 'subtest',
      showLoaderTab: false,
      showLoaderTest: false,
      test: {},
      subtests: [],
      scales: []
    }
  },
  created () {
    this.getTest()
  },
  watch: {
    tab: {
      immediate: true,
      handler (to) {
        if (to === 'subtest') this.getSubtests()
        if (to === 'scale') this.getScale()
        if (to === 'connection') this.getConnection()
      }
    }
  },
  methods: {
    getTest () {
      this.showLoaderTest = true
      app.getAdminTest(this.$route.params.id).then((data) => {
        this.test = data
        this.showLoaderTest = false
      }).catch((error) => {
        this.showLoaderTest = false
        this.$store.dispatch('showError', error)
      })
    },
    getSubtests () {
      this.showLoaderTab = true
      app.getAdminTestSubtests(this.$route.params.id).then((data) => {
        this.subtests = data
        this.showLoaderTab = false
      }).catch((error) => {
        this.showLoaderTab = false
        this.$store.dispatch('showError', error)
      })
    },
    getScale () {
      this.showLoaderTab = true
      app.getAdminTestScale(this.$route.params.id).then((data) => {
        this.scales = data
        this.showLoaderTab = false
      }).catch((error) => {
        this.showLoaderTab = false
        this.$store.dispatch('showError', error)
      })
    },
    getConnection () {
      this.showLoaderTab = true
      app.getAdminTestKeys(this.$route.params.id).then((data) => {
        this.scales = data
        this.showLoaderTab = false
      }).catch((error) => {
        this.showLoaderTab = false
        this.$store.dispatch('showError', error)
      })
    },
    next (params) {
      this.$router.push({ name: params || 'admin' })
    }
  }
}
</script>
