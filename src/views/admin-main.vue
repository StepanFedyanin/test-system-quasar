<template>
  <div class="row justify-between items-center q-mb-xl">
    <breadcrumbs-menu/>
    <q-btn color="primary" class="q-px-lg">
      Добавить тест
    </q-btn>
  </div>
    <div class="admin__content q-mb-lg card card__shadow">
      <div class="admin__important col-12 row items-center q-mb-md">
        <div class="col-8">Название</div>
        <div class="col-2">Количество вопросов</div>
        <div class="col-1">Шкалы</div>
        <div class="col">Статус</div>
      </div>
      <router-link v-for="test in tests.data" :key="test.id" :to="{ name: 'adminTest', params: {id:test.id} }"
                   class="admin__test row col-12 items-center q-mb-sm">
        <div class="col-8 text-bold text-primary">{{ test.name }}</div>
        <div class="col-2 text-secondary">
          {{ $helpers.stringForNumber(test.count_quest, ['вопрос', 'вопроса', 'вопросов']) }}
        </div>
        <div class="col-1 text-secondary">{{ test.count_scale}} шкал</div>
        <div class="col">
          <q-icon v-if="test.status == 'опубликовано'" name="done" color="positive" size="20px"/>
          <q-icon v-else name="close" color="negative" size="20px"/>
        </div>
      </router-link>
    </div>
    <div class="flex items-center q-gutter-lg q-mb-lg">
    <div class="text-secondary">Всего строк: {{tests.count_test}}</div>
    <div class="flex items-center text-secondary">
      На странице:
      <q-btn flat :label="`${pagination.limit} строк`">
        <q-icon name="expand_more"/>
        <q-menu>
          <q-list>
            <q-item v-for="limit in limitData" :key="`limit_value_${limit}`" clickable v-close-popup>
              <q-item-section @click="changeLimit(limit)" :class="[pagination.limit === limit? 'text-primary'  : 'text-secondary']">{{limit}} строк</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
    <q-pagination
      class="q-pb-xl"
      v-if="tests.count_test < 100"
    v-model="pagination.offset"
    :max="Math.ceil(this.tests.count_test / this.pagination.limit)"
    direction-links
    flat
    color="grey"
    active-color="primary"
  />
</template>

<script>
import app from 'src/services/app'
import BreadcrumbsMenu from 'components/breadcrumb.vue'

export default {
  name: 'admin-content',
  components: { BreadcrumbsMenu },
  data () {
    return {
      pagination: { limit: 10, offset: 1 },
      tests: {},
      limitData: [10, 25, 50, 100]
    }
  },
  created () {
    this.getTests()
  },
  watch: {
    'pagination.limit': {
      handler () {
        this.getTests()
      }
    },
    'pagination.offset': {
      handler () {
        this.getTests()
      }
    }
  },
  methods: {
    getTests () {
      app.getAdminTests(this.pagination).then((data) => {
        this.tests = data
      })
    },
    changeLimit (value) {
      this.pagination.limit = value
    },
    next (params) {
      this.$router.push({ name: params || 'adminTest' })
    }
  }
}
</script>
