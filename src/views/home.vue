<template>
  <TopBar class="q-mb-md"/>
  <div class="home col-grow row content-center items-center q-pb-md">
    <div class="row home__content col-12 col-md-6 col-xl-6">
      <div class="home__title text-h1 text-primary q-mb-lg text-bold">
        Выбери и пройди тестирование
      </div>
      <span class="home__description text-h3 q-mb-xl col col-md-9 col-lg-6">Авторизируйтесь на платформе, чтобы проходить тесты </span>
      <div class="row items-center col-7 col-md-5">
        <q-btn color="primary" class="col-12 q-pa-sm q-mb-sm text-h3" @click="next()">Войти</q-btn>
        <q-btn flat class="col-12 text-secondary text-h3" @click="next('auth')">Авторизоваться</q-btn>
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
