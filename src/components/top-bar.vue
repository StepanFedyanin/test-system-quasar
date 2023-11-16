<template>
  <div>
    <q-toolbar class="topbar q-mt-md justify-between">
      <div class="col">
        <button class="topbar__logo text-h2 full-width text-primary">
          Pro<span class="text-secondary">Test</span>
        </button>
      </div>
      <div class="col-md-6 col-lg-9">
        <router-link
          v-for="item in accountMenu"
          :key="item.name"
          class="text-primary text-h3 text-bold"
          :to="item.link"
          :title="item.title"
        >
          {{ item.title }}
        </router-link>
      </div>
      <q-btn class="col q-px-lg" outline color="primary" @click="next('auth')">
        вход / регистрация
      </q-btn>
    </q-toolbar>
  </div>
</template>

<script>
import { accountMenu } from 'src/settings/development'

export default {
  name: 'TopBar',
  data () {
    return {
      accountMenu
    }
  },
  created () {
    this.accountMenu = accountMenu.notAuthorized
  },
  methods: {
    next (params) {
      this.$router.push({ name: params || 'allTests' })
    }
  }
}
</script>
