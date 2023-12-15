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
      <router-link v-for="test in tests" :key="test.id" :to="{ name: 'adminTest', params: {id:test.id} }"
                   class="admin__test row col-12 items-center q-mb-sm">
        <div class="col-8 text-bold text-primary">{{ test.name }}</div>
        <div class="col-2 text-secondary">
          {{ $helpers.stringForNumber(test.count_question, ['вопрос', 'вопроса', 'вопросов']) }}
        </div>
        <div class="col-1 text-secondary">{{ test.count_scale }} шкал</div>
        <div class="col">
          <q-icon v-if="test.status" name="done" color="positive" size="20px"/>
          <q-icon v-else name="close" color="negative" size="20px"/>
        </div>
      </router-link>
    </div>
    <div class="flex items-center q-gutter-lg q-mb-lg">
    <div class="text-secondary">Всего строк: 1753</div>
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
    <q-pagination class="q-pb-xl"
    v-model="pagination.offset"
    max="5"
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
      tests: [{
        id: 1,
        name: 'Тест спилберга',
        count_question: 10,
        status: true,
        count_scale: 10
      },
      {
        id: 2,
        name: 'Тест спилберга 2',
        count_question: 100,
        status: false,
        count_scale: 5
      },
      {
        id: 3,
        name: 'Тест спилберга 3',
        count_question: 15,
        status: true,
        count_scale: 7
      }
      ],
      limitData: [10, 25, 50, 100]
    }
  },
  created () {
    this.getTests()
  },
  methods: {
    getTests () {
      app.getAdminTests(this.pagination).then(() => {
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
