<template>
    <breadcrumbs-menu/>
    <div class="tests">
      <div class="description description__point q-mb-lg">
        Быстрая навигация по популярным тестам и тематикам. Всего на сайте более тысячи тестов, найти нужный можно
        при помощи подробного <span class="description__selected">тематического указателя</span>, по каталогу
        <span class="description__selected">авторов</span>, или <span
        class="description__selected">поиском</span> по названию. Можно посмотреть <span
        class="description__selected">полный список</span>.
      </div>
      <div class="row">
        <q-btn
          v-for="testFilter in testFilters"
          :key="testFilter.type"
          @click="changeCurrentType(testFilter.type)"
          :outline="currentFilter.type!==testFilter.type"
          color="primary"
          class="q-px-xl q-mr-md q-mb-md"
        >
          {{ testFilter.name }}
        </q-btn>
      </div>
      <div class="row q-mb-md items-center">
        Сортировать по:
        <div class="col-12 col-sm-10">
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
      </div>
      <div class="q-mb-xl">
        <q-input class="tests__search" label="Поиск">
          <template v-slot:append>
            <q-btn round icon="search" size="10px">
            </q-btn>
          </template>
        </q-input>
      </div>
    </div>
    <div
      v-if="showLoaderTests"
      class="loader"
    >
      <q-circular-progress
        indeterminate
        rounded
        size="50px"
        color="primary"
        class="q-ma-md"
      />
    </div>
    <div v-else class="row q-pb-lg">
      <q-card
        class="card col-6 col-sm-4 col-lg-3"
        v-for="category in testsCategory"
        :key="`category-${category.id}`"
      >
        <q-card-section class="card__header q-py-sm">
          <div class="text-white">{{ category.name }}</div>
        </q-card-section>

        <q-card-actions vertical class="q-pa-none">
          <router-link
            v-for="test in category.test"
            :key="`test-${test.id}`"
            class="card__item card__link flex no-wrap items-center"
            :to="{ name: 'test', params: {id:test.id} }"
          >
            <span>{{ test.name }}</span>
            <q-icon color="primary" name="chevron_right" size="20px"/>
          </router-link>
        </q-card-actions>
      </q-card>
    </div>
</template>

<script>

import app from 'src/services/app'
import BreadcrumbsMenu from 'components/breadcrumb.vue'

export default {
  name: 'all-test',
  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    if (!process.env.SERVER) { return null }
    await app.getCategory().then((res) => {
      store.dispatch('data', { key: 'tests', data: res })
    }).catch((error) => {
      store.dispatch('showError', error)
    })
  },
  components: { BreadcrumbsMenu },
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
      showLoaderTests: false
    }
  },
  computed: {
    testsCategory () {
      return this.$store.state.data?.tests || []
    }
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler (to) {
        if (process.env.CLIENT && to === 'allTests') this.getCategory()
      }
    }
  },
  methods: {
    getCategory () {
      this.showLoaderTests = true
      app.getCategory().then((res) => {
        this.$store.dispatch('data', { key: 'tests', data: res })
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
    next (name) {
      this.$router.push({ name: name || '' })
    }
  }
}
</script>
