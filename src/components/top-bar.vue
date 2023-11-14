<template>
  <div>
    <q-toolbar class="topbar">
      <div class="col-2">
        <q-btn flat class="topbar__logo text-h2 full-width text-primary">
          Pro<span class="text-secondary">Test</span>
        </q-btn>
      </div>
      <div class="col-md-6 col-lg-7">
        <router-link
          v-for="item in accountMenu"
          :key="item.name"
          class="text-primary text-h3 text-bold"
          :to="item.link"
          :title="item.title"
        >
          {{ item.title }}
        </router-link>
<!--                        <b-button class="topBar__link topBar__menu&#45;&#45;item text-uppercase fw-bold p-0 d-flex d-md-none" v-else @click="next()">-->
<!--                            вход / регистрация-->
<!--                        </b-button>-->
      </div>
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
  }
}
</script>
