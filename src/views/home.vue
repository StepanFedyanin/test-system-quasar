<template>
  <TopBar/>
  <div class="home col-grow row items-center">
    <div class="row col-sm-12 col-md-7 col-xl-6">
      <div class="text-h1 text-primary q-mb-lg text-bold">
        Выбери и пройди тестирование
      </div>
      <span class="text-h3 q-mb-xl col-12">Авторизируйтесь на платформе,<br/> чтобы проходить тесты </span>
      <div class="row items-center col-7 col-md-5">
        <q-btn color="primary" class="col-12 q-pa-md q-mb-sm text-h3">Войти</q-btn>
        <q-btn flat class="col-12 text-secondary text-h3">Авторизоваться</q-btn>
      </div>
    </div>
    <div class="home__cover col-sm-8 col-md-5 col-xl-6"></div>
  </div>
</template>

<script>
import TopBar from 'components/top-bar.vue'

export default {
  name: 'HomePage',
  components: { TopBar }
}
</script>
