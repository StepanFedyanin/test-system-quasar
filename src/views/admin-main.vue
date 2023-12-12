<template>
  <div class="row q-mb-lg">
    <div class='full-width flex justify-end'>
      <q-btn color="primary" class="q-px-lg">
        Добавить тест
      </q-btn>
    </div>
  </div>
  <div class="admin__content">
      <div class="admin__important col-12 row items-center q-mb-md">
        <div class="col-3 text-center">Название</div>
        <div class="col-3 text-center">Количество вопросов</div>
        <div class="col-3 text-center">Статус</div>
        <div class="col-3 text-center">Шкалы</div>
      </div>
      <router-link v-for="test in tests" :key="test.id" :to="{ name: 'adminTest', params: {id:test.id} }" class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">{{test.name}}</div>
        <div class="col-3 text-center"> {{ $helpers.stringForNumber(test.count_question, ['вопрос', 'вопроса', 'вопросов']) }}</div>
        <div :class="['col-3 text-center admin__test--posted']">{{test.status}}</div>
        <div class="col-3 text-center">{{test.count_scale}} шкал</div>
      </router-link>
    <div class="q-mb-lg col-12">
        <q-pagination
          v-model="pagination"
          max="5"
          direction-links
          flat
          color="grey"
          active-color="primary"
        />
      </div>
    </div>
</template>

<script>
export default {
  name: 'admin-content',
  data () {
    return {
      pagination: 1,
      tests: [{
        id: 1,
        name: 'Тест спилберга',
        count_question: 10,
        status: 'скрыт',
        count_scale: 10
      },
      {
        id: 2,
        name: 'Тест спилберга 2',
        count_question: 100,
        status: 'Выложено',
        count_scale: 5
      },
      {
        id: 3,
        name: 'Тест спилберга 3',
        count_question: 15,
        status: 'Редактируется',
        count_scale: 7
      }
      ]
    }
  },
  methods: {
    next (params) {
      this.$router.push({ name: params || 'adminTest' })
    }
  }
}
</script>
