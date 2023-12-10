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
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--posted']">Выложено</div>
        <div class="col-3 text-center">10 шкал</div>
      </div>
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--edited']">Редактируется</div>
        <div class="col-3 text-center">10 шкал</div>
      </div>
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--hidden']">Скрыт</div>
        <div class="col-3 text-center">10 шкал</div>
      </div>
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--hidden']">Скрыт</div>
        <div class="col-3 text-center">10 шкал</div>
      </div>
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--hidden']">Скрыт</div>
        <div class="col-3 text-center">10 шкал</div>
      </div>
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--hidden']">Скрыт</div>
        <div class="col-3 text-center">10 шкал</div>
      </div>
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
      pagination: 1
    }
  },
  methods: {
    next (params) {
      this.$router.push({ name: params || 'adminTest' })
    }
  }
}
</script>
