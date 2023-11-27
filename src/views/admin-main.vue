<template>
  <div class="row q-mb-lg">
    <div class='row col-8 items-center justify-between'>
      <q-input v-model="login" label="Поиск">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
      <q-btn color="primary" class="q-px-lg">
        Добавить тест
        <q-menu
          anchor="bottom right"
          self="bottom left"
        >
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section @click="next()">Добавить тест</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Загрузить файлом</q-item-section>
            </q-item>
          </q-list>
        </q-menu></q-btn>
    </div>
  </div>
  <div class="admin__content row justify-between">
    <div class="row col-8">
      <div class="admin__important col-12 row items-center q-mb-md">
        <div class="col-3 text-center">Название</div>
        <div class="col-3 text-center">Количество вопросов</div>
        <div class="col-3 text-center">Статус</div>
        <div class="col-3 text-center">инстурменты</div>
      </div>
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--posted']">Выложено</div>
        <div class="col-3 text-center">инстурменты</div>
      </div>
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--edited']">Редактируется</div>
        <div class="col-3 text-center">инстурменты</div>
      </div>
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--hidden']">Скрыт</div>
        <div class="col-3 text-center">инстурменты</div>
      </div>
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--hidden']">Скрыт</div>
        <div class="col-3 text-center">инстурменты</div>
      </div>
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--hidden']">Скрыт</div>
        <div class="col-3 text-center">инстурменты</div>
      </div>
      <div class="admin__test row col-12 items-center q-mb-md">
        <div class="col-3 text-center text-bold text-primary">Тест Спилбергера</div>
        <div class="col-3 text-center">75 вопросов</div>
        <div :class="['col-3 text-center admin__test--hidden']">Скрыт</div>
        <div class="col-3 text-center">инстурменты</div>
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
    <div class="col-auto admin__important full-height">
      <div class="full-width q-mb-md text-center text-bold text-primary">
        Информация
      </div>
      <div class="q-mb-sm">Пройдено тестов: <span class="text-primary">{{200}}</span></div>
      <div class="q-mb-sm">Популярный тест: <span class="text-primary">{{'Тест Спилбергера'}}</span></div>
      <div class="q-mb-sm">Пользователей зарегистрировано : <span class="text-primary">{{200}}</span></div>
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
