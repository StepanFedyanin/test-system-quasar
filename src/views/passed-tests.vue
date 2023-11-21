<template>
    <div>
      <breadcrumbs-menu/>
        <div class="q-mb-md">
            <q-btn
                class="card card__border full-width description__point"
                align="between"
                flat
                @click="next()"
            >
                12312
                <div class="text-primary row items-center">
                    14 попыток
                    <q-icon color="primary" name="chevron_right"/>
                </div>
            </q-btn>
        </div>
    </div>
</template>

<script>

import BreadcrumbsMenu from 'components/breadcrumb.vue'

export default {
  name: 'passed-test',
  components: { BreadcrumbsMenu },
  methods: {
    next (name, params = 1) {
      this.$store.dispatch('addTest', params)
      this.$router.push({ name: name || 'testPassed' })
    }
  }
}
</script>
