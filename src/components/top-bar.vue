<template>
  <div>
    <q-toolbar class="topbar q-mt-md justify-between">
      <div class="col-auto q-mr-md">
        <button class="topbar__logo text-h2 full-width text-primary" @click="next('profile')">
          Pro<span class="text-secondary">Test</span>
        </button>
      </div>
      <div :class="['topbar__menu', 'col-grow', showMenu&&'topbar__menu--active']" @click="handleShowMenu()">
        <div :class="['topbar__content',showMenu&&'topbar__content--active']" @click.stop>
          <div class="topbar__content--burger topbar__burger topbar__burger--active" @click="handleShowMenu()">
            <span/>
          </div>
          <router-link
            class="topbar__content--extra text-primary text-h3 text-bold q-mx-sm"
            to="/profile"
            v-if="user?.id"
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
          <span class="topbar__content--extra text-primary text-h3 text-bold q-mx-sm cursor-pointer" v-if="user.id" @click="exit()">Выход</span>
          <span class="topbar__content--extra text-primary text-h3 text-bold q-mx-sm cursor-pointer" @click="exit()" v-else>вход / регистрация</span>
        </div>
      </div>
      <div v-if="user?.id" class="topbar__user col-auto row q-gutter-sm">
        <q-btn flat color="primary" :label="user.email">
          <q-menu class="topbar__dropdown text-primary">
            <q-list dense style="min-width: 100px">
              <q-item clickable class="text-weight-bold">
                <q-item-section>{{user.name}} {{user.surname}}</q-item-section>
              </q-item>
              <q-item clickable @click="next('profile')">
                <q-item-section>Личный кабинет</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable @click="exit()">
                <q-item-section class="cursor-pointer">Выход</q-item-section>
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
      user: {},
      accountMenu: [],
      showMenu: false
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        if (this.showMenu) {
          this.showMenu = !this.showMenu
        }
      }
    },
    '$store.state.user': {
      immediate: true,
      handler () {
        this.user = this.$store.state.user
      }
    }
  },
  created () {
    this.user = this.$store.state.user
    if (this.user.id) {
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
      this.$store.dispatch('initUser', {})
      this.$store.dispatch('clearToken')
      this.next('auth')
    }
  }
}
</script>
