<template>
  <div>
    <q-toolbar class="topbar q-mt-md justify-between">
      <div class="col">
        <button class="topbar__logo text-h2 full-width text-primary" @click="next('profile')">
          Pro<span class="text-secondary">Test</span>
        </button>
      </div>
      <div :class="['topbar__menu', user?'col-12 col-sm-8 col-lg-9':'col-6 col-md-7 col-lg-9', showMenu&&'topbar__menu--active']" @click="handleShowMenu()">
        <div :class="['topbar__content',showMenu&&'topbar__content--active']" @click.stop>
          <div class="topbar__content--burger topbar__burger topbar__burger--active" @click="handleShowMenu()">
            <span/>
          </div>
          <router-link
            class="topbar__content--extra text-primary text-h3 text-bold q-mx-sm"
            to="/profile"
            v-if="user"
          >
            Личный кабинет
          </router-link>
          <router-link
            v-for="item in accountMenu"
            :key="item.name"
            class="text-primary text-h3 text-bold q-mx-sm"
            :to="item.link"
            :title="item.title"
          >
            {{ item.title }}
          </router-link>
          <span class="topbar__content--extra text-primary text-h3 text-bold q-mx-sm" v-if="user">Выйти</span>
          <router-link
            v-else
            class="topbar__content--extra text-primary text-h3 text-bold q-mx-sm"
            to="/auth"
          >
            вход / регистрация
          </router-link>
        </div>
      </div>
      <div v-if="user" class="topbar__user row">
        <q-btn flat color="primary" label="name@mail.ru">
          <q-menu class="topbar__dropdown text-primary">
            <q-list dense style="min-width: 100px">
              <q-item clickable class="text-weight-bold">
                <q-item-section>Имя Фамилия</q-item-section>
              </q-item>
              <q-item clickable @click="next('profile')">
                <q-item-section>Личный кабинет</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable @click="exit()">
                <q-item-section>Выход</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <div class="cover cover__small"/>
      </div>
      <q-btn v-else class="topbar__user col q-px-lg" outline color="primary" @click="next('auth')">
        вход / регистрация
      </q-btn>
      <div class="topbar__burger" @click="handleShowMenu()">
        <span/>
      </div>
    </q-toolbar>
  </div>
</template>

<script>
import { accountMenu } from 'src/settings'

export default {
  name: 'TopBar',
  data () {
    return {
      user: null,
      accountMenu: [],
      showMenu: false
    }
  },
  created () {
    this.user = this.$store.state.user
    if (this.user) {
      this.accountMenu = accountMenu.authorized
    } else {
      this.accountMenu = accountMenu.notAuthorized
    }
  },
  methods: {
    next (params) {
      this.$router.push({ name: params || 'allTests' })
    },
    handleShowMenu () {
      this.showMenu = !this.showMenu
    },
    exit () {

    }
  }
}
</script>
