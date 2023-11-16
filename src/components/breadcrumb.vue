<template>
  <div class="q-mb-xl">
    <ol
      v-if="$breadcrumbs.value && $breadcrumbs.value.length > 1"
      class="breadcrumb"
    >
      <li
        v-for="(item, index) in $breadcrumbs.value"
        :key="`breadcrumbs-${index}`"
        class="breadcrumb__item text-secondary"

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
      this.$router.push({ name: params || 'tests' })
    },
    initBreadcrumbs () {
      this.$nextTick(() => {
        if (this.$breadcrumbs.value[this.$breadcrumbs.value.length - 1].link === 'test') {
          this.$breadcrumbs.value[this.$breadcrumbs.value.length - 1].label = this.$store.state.test.name
        }
      })
    }
  }
}
</script>
