<template>
  <q-no-ssr>
    <div class="q-mb-xl">
      <ol
        v-if="$breadcrumbs.value && $breadcrumbs.value.length > 1"
        class="breadcrumb row"
      >
        <li
          v-for="(item, index) in $breadcrumbs.value"
          :key="`breadcrumbs-${index}`"
          class="breadcrumb__item cursor-pointer text-secondary"
          @click="next(item.link)"
        >
          {{ item.label }}
        </li>
      </ol>
      <div class="text-h2 text-primary text-bold">{{ selectSubtest || $breadcrumbs.value[this.$breadcrumbs.value.length - 1].label }}</div>
    </div>
  </q-no-ssr>
</template>

<script>

export default {
  name: 'breadcrumbs-menu',
  watch: {
    $route: {
      immediate: true,
      handler () {
        this.initBreadcrumbs()
      }
    },
    '$store.state.test.name': {
      immediate: true,
      handler () {
        this.initBreadcrumbs()
      }
    }
  },
  computed: {
    testName () {
      return this.$store.state?.test?.name || null
    },
    selectSubtest () {
      return this.$store.state.test?.select_subtest?.name || null
    }
  },
  methods: {
    next (params) {
      this.$router.push({ name: params || 'allTests' })
    },
    initBreadcrumbs () {
      this.$nextTick(() => {
        this.$breadcrumbs.value.forEach((breadcrumbs, index) => {
          if (breadcrumbs.label.includes('replace') || breadcrumbs.label === '') {
            this.$breadcrumbs.value[index].label = this.testName || 'Тест'
          }
        })
      })
    }
  }
}
</script>
