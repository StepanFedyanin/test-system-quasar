<template>
  <div>
    <breadcrumbs-menu/>
    <div>
      <template v-if="longDescription">
        <div class="row flex-sm-column flex-md-row align-items-start">
          <!--        <table class="attempts col-8 col-md-4 col-lg-3 mb-4">-->
          <!--          <thead>-->
          <!--          <tr>-->
          <!--            <td>-->
          <!--              Попытка-->
          <!--            </td>-->
          <!--            <td>-->
          <!--              Дата-->
          <!--            </td>-->
          <!--          </tr>-->
          <!--          </thead>-->
          <!--          <tbody>-->
          <!--          <tr v-for="(attempt,index) in attempts" :key="attempt+Date.now()">-->
          <!--            <td>-->
          <!--              {{ index + 1 }} Попытка-->
          <!--            </td>-->
          <!--            <td>-->
          <!--              {{ attempt }}-->
          <!--            </td>-->
          <!--          </tr>-->
          <!--          </tbody>-->
          <!--        </table>-->
          <div class="">
            <div class="description description__point q-mb-lg">
              Авторы: Арнольд Басс, Энн Дарки (1957)<br/>
              Адаптация: А. К. Осницкий (1998); А. А. Хван и др. (2005)<br/>
              смотрите замечания по методике<br/>
            </div>
            <div class="description description__point q-mb-lg">
              {{test.sdescription}}
            </div>
            <div class="row justify-between items-center">
              <span class="text-primary">75 вопросов</span>
              <q-btn color="primary" class="q-px-xl" @click="next">Пройти тест</q-btn>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="row justify-end q-mb-lg">
          <q-btn color="primary">Пройти тест</q-btn>
        </div>
        <div class="description description__point q-mb-lg">
          Авторы: Арнольд Басс, Энн Дарки (1957)<br/>
          Адаптация: А. К. Осницкий (1998); А. А. Хван и др. (2005)<br/>
          смотрите замечания по методике<br/>
        </div>
        <div class="description description__point q-mb-lg">
          Шкала тревоги Спилбергера-Ханина (State-Trait Anxiety Inventory, STAI) является информативным способом
          самооценки как уровня тревожности в данный момент (реактивная тревожность, как состояние), так и
          личностной
          тревожности (как устойчивая характеристика человека).
          <br/>
          <br/>
          Шкала тревоги Спилбергера-Ханина (State-Trait Anxiety Inventory, STAI) является информативным способом
          самооценки как уровня тревожности в данный момент (реактивная тревожность, как состояние), так и
          личностной
          тревожности (как устойчивая характеристика человека).
        </div>
        <div class="row justify-between">
          <!--        <table class="attempts mb-4 w-100">-->
          <!--          <thead>-->
          <!--          <tr>-->
          <!--            <td>-->
          <!--              Попытка-->
          <!--            </td>-->
          <!--            <td>-->
          <!--              Дата-->
          <!--            </td>-->
          <!--          </tr>-->
          <!--          </thead>-->
          <!--          <tbody>-->
          <!--          <tr v-for="(attempt,index) in attempts" :key="attempt+Date.now()">-->
          <!--            <td>-->
          <!--              {{ index + 1 }} Попытка-->
          <!--            </td>-->
          <!--            <td>-->
          <!--              {{ attempt }}-->
          <!--            </td>-->
          <!--          </tr>-->
          <!--          </tbody>-->
          <!--        </table>-->
          <q-btn color="primary">Все результаты</q-btn>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import BreadcrumbsMenu from 'components/breadcrumb.vue'

export default {
  name: 'test-description',
  components: { BreadcrumbsMenu },
  data () {
    return {
      test: null,
      attempts: ['24.07.2023', '24.07.2023', '24.07.2023', '24.07.2023', '24.07.2023'],
      longDescription: true
    }
  },
  created () {
    this.test = this.$store.state.test
  },
  methods: {
    next () {
      this.$router.push({ name: this.$route.path.includes('all_tests') ? 'testResponse' : 'testResponsePassed' })
    }
  }
}
</script>
