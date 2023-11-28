<template>
  <div class="q-mb-xl">
    <ol
      v-if="$breadcrumbs.value && $breadcrumbs.value.length > 1"
      class="breadcrumb"
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
    <div class="text-h2 text-primary text-bold">{{ $breadcrumbs.value[this.$breadcrumbs.value.length - 1].label }}</div>
  </div>
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
    '$store.state.test': {
      immediate: true,
      handler () {
        this.initBreadcrumbs()
      }
    }
  },
  methods: {
    next (params) {
      this.$router.push({ name: params || 'allTests' })
    },
    initBreadcrumbs () {
      this.$nextTick(() => {
        if (this.$route.fullPath.includes('/test') && !this.$route.fullPath.includes('/test/')) {
          this.$breadcrumbs.value[this.$breadcrumbs.value.length - 1].label = this.$store.state.test.name
        }
        if (this.$route.fullPath.includes('/test/')) {
          this.$breadcrumbs.value[this.$breadcrumbs.value.length - 2].label = this.$store.state.test.name
        }
      })
    }
  }
}
</script>
