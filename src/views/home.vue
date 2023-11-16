<template>
  <TopBar/>
  <div class="home col-grow row content-center items-center">
    <div class="row home__content col-12 col-md-6 col-xl-6">
      <div class="text-h1 text-primary q-mb-lg text-bold">
        Выбери и пройди тестирование
      </div>
      <span class="text-h3 q-mb-xl col col-md-6 col-lg-6">Авторизируйтесь на платформе, чтобы проходить тесты </span>
      <div class="row items-center col-7 col-md-5">
        <q-btn color="primary" class="col-12 q-pa-md q-mb-sm text-h3" @click="next('auth')">Войти</q-btn>
        <q-btn flat class="col-12 text-secondary text-h3" @click="next()">Авторизоваться</q-btn>
      </div>
    </div>
    <div class="home__cover col-12 col-md-6 col-xl-6"></div>
  </div>
</template>

<script>
import TopBar from 'components/top-bar.vue'

export default {
  name: 'HomePage',
  components: { TopBar },
  methods: {
    next (params) {
      this.$router.push({ name: params || 'allTests' })
    }
  }
}
</script>
