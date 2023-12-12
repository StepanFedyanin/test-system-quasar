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
      <h2 class="text-h2 text-primary text-bold">{{ title }}</h2>
    </div>
  </q-no-ssr>
</template>

<script>

export default {
  name: 'breadcrumbs-menu',
  computed: {
    title () {
      return process.env.CLIENT ? this?.$route?.meta?.title : ''
    }
  },
  methods: {
    next (params) {
      this.$router.push({ name: params || 'allTests' })
    }
  }
}
</script>
