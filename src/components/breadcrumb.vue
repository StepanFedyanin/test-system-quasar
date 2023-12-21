<template>
  <q-no-ssr>
    <div>
      <ol
        v-if="$breadcrumbs.value && $breadcrumbs.value[$breadcrumbs.value.length - 1]?.label !== title"
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
      <h2 class="text-h2 text-primary text-bold">{{ title ||  testName}}</h2>
    </div>
  </q-no-ssr>
</template>

<script>

export default {
  name: 'breadcrumbs-menu',
  watch: {
    '$breadcrumbs.value': {
      immediate: true,
      handler () {
        if (process.env.CLIENT) this.initBreadcrumbs()
      }
    }
  },
  computed: {
    title () {
      return process.env.CLIENT ? this?.$route?.meta?.title : false
    },
    testName () {
      return this.$store.state.test?.name || ''
    }
  },
  methods: {
    initBreadcrumbs () {
      console.log(this.$breadcrumbs.value)
      this.$nextTick(() => {
        this.$breadcrumbs.value.forEach((breadcrumbs, index) => {
          if (breadcrumbs.label.includes('replace')) {
            this.$breadcrumbs.value[index].label = this.testName
          }
        })
      })
    },
    next (params) {
      this.$router.push({ name: params || 'allTests' })
    }
  }
}
</script>
