<template>
  <div class="tests">
    <div class="description description__point q-mb-lg">
      Быстрая навигация по популярным тестам и тематикам. Всего на сайте более тысячи тестов, найти нужный можно
      при помощи подробного <span class="description__selected">тематического указателя</span>, по каталогу
      <span class="description__selected">авторов</span>, или <span
      class="description__selected">поиском</span> по названию. Можно посмотреть <span
      class="description__selected">полный список</span>.
    </div>
    <div class="row q-mb-md">
      <q-btn
        v-for="testFilter in testFilters"
        :key="testFilter.type"
        @click="changeCurrentType(testFilter.type)"
        :outline="currentFilter.type!==testFilter.type"
        color="primary"
        class="q-px-xl q-mr-md"
      >
        {{ testFilter.name }}
      </q-btn>
    </div>
    <div class="row q-mb-md items-center">
          Сортировать по:
          <q-btn
            v-for="testFilterAds in testFiltersAds"
            :key="testFilterAds.type"
            :variant="currentFilter.sorted===testFilterAds.type?'secondary active':'secondary'"
            @click="changeCurrentSorted(testFilterAds.type)"
            :class="[`${currentFilter.sorted===testFilterAds.type?'text-primary': 'text-secondary'}`]"
            flat
          >
            {{ testFilterAds.name }}
          </q-btn>
        </div>
    <div class="q-mb-xl">
      <q-input borderless class="tests__search" label="Поиск">
        <template v-slot:append>
          <q-btn round icon="search">
          </q-btn>
        </template>
      </q-input>
    </div>
  </div>
  <q-circular-progress
    v-if="showLoaderTests"
    indeterminate
    rounded
    size="50px"
    color="primary"
    class="q-ma-md"
  />
  <div v-else class="row">
    <q-card
      class="card col-3"
      v-for="category in testsCategory"
      :key="`category-${category.id}`"
    >
      <q-card-section class="card__header q-py-sm">
        <div class="text-white">{{category.name}}</div>
      </q-card-section>

      <q-card-actions vertical>
        <q-btn
          class="card__item full-width"
          align="between"
          flat
          @click="next('test', test.id)"
          v-for="test in category.test"
          :key="`test-${test.id}`"
        >
          {{test.name}}
          <q-icon color="primary" name="chevron_right"/>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>

import app from 'src/services/app'

export default {
  name: 'all-test',
  data () {
    return {
      testFilters: [
        {
          name: 'Тесты',
          type: 'test'
        },
        {
          name: 'Темы',
          type: 'topics'
        },
        {
          name: 'Авторы',
          type: 'authors'
        }
      ],
      testFiltersAds: [
        {
          name: 'Сложности',
          type: 'difficulties'
        },
        {
          name: 'Популярности',
          type: 'popularity'
        }
      ],
      currentFilter: { type: 'test', sorted: 'difficulties', searchValue: '' },
      testsCategory: [],
      showLoaderTests: true,
      test: null
    }
  },
  created () {
    this.test = this.$store.state.test
    this.getCategory()
  },
  computed: {
    filteredTestsCategory () {
      return this.testsCategory.filter(item => item.test.some(test => test.name.toLowerCase().includes(this.currentFilter.searchValue.toLowerCase())))
    }
  },
  methods: {
    getCategory () {
      this.showLoaderTests = true
      app.getCategory().then((res) => {
        this.testsCategory = res
        this.showLoaderTests = false
      }).catch((error) => {
        this.$store.dispatch('showError', error)
        this.showLoaderTests = false
      })
    },
    changeCurrentType (type) {
      this.currentFilter = { ...this.currentFilter, type }
    },
    changeCurrentSorted (sorted) {
      this.currentFilter = { ...this.currentFilter, sorted }
    },
    next (name, params) {
      console.log()
      this.$store.dispatch('addTest', params)
      this.$router.push({ name: name || '' })
    }
  }
}
</script>
