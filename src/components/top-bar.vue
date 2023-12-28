<template>
  <div>
    <q-toolbar class="topbar q-mt-md justify-between">
      <div class="col-grow col-md-auto q-mr-md">
        <h1 class="topbar__logo text-h2 full-width text-primary" @click="next('allTests')">
          Pro<span class="text-accent">Test</span>
        </h1>
      </div>
      <div :class="['topbar__menu', 'col-grow', showMenu&&'topbar__menu--active']" @click="handleShowMenu()">
        <div :class="['topbar__content',showMenu&&'topbar__content--active']" @click.stop>
          <div class="topbar__content--burger topbar__burger topbar__burger--active" @click="handleShowMenu()">
            <span/>
          </div>
          <router-link
            class="topbar__content--extra text-primary text-h4  q-mx-sm cursor-pointer"
            to="/profile"
            v-if="user?.id"
          >
            Личный кабинет
          </router-link>
          <router-link
            v-for="item in accountMenu"
            :key="item.name"
            class="text-primary text-h4 q-mx-sm"
            :to="item.link"
            :title="item.title"
          >
            {{ item.title }}
          </router-link>
          <span class="topbar__content--extra text-primary text-h4  q-mx-sm cursor-pointer" v-if="user.id" @click="exit()">Выход</span>
          <span class="topbar__content--extra text-primary text-h4  q-mx-sm cursor-pointer" @click="exit()" v-else>вход / регистрация</span>
        </div>
      </div>
      <div :class="['topbar__search', searchActive&&'topbar__search--active']">
        <q-input borderless v-model="searchValue" @update:model-value="handleInput" @focus="changeSearchState" @blur="changeSearchState" label="Поиск" class="topbar__search--input">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
        <div v-if="searchActive" class="topbar__search--results">
          <div v-if="showLoaderTest" class="flex justify-center">
            <q-circular-progress
              indeterminate
              rounded
              size="50px"
              color="primary"
              class="q-ma-md"
            />
          </div>
          <template v-else-if="tests.length && searchValue.length">
            <router-link
              v-for="(test) in tests"
              :key="`searchResult_${test.id}`"
              class="card__item card__link flex no-wrap items-center justify-between"
              :to="`test/${test.id}`"
            >
              <span class="text-weight-regular">{{test.name}}</span>
              <q-icon color="primary" name="chevron_right" size="20px"/>
            </router-link>
          </template>
          <div v-else-if="searchValue.length" class="text-h6 q-pa-sm text-secondary">нет тестов удовлетворяющих поиску</div>
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
      <q-btn v-else class="topbar__user col-auto q-px-lg" outline color="primary" @click="next('auth')">
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
import debounce from 'lodash.debounce'
import { app } from 'src/services'

export default {
  name: 'TopBar',
  data () {
    return {
      user: {},
      accountMenu: [],
      showMenu: false,
      searchValue: '',
      searchActive: false,
      showLoaderTest: false,
      tests: []
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
    changeSearchState () {
      this.tests = []
      this.searchActive = !this.searchActive
      if (this.searchActive && this.searchValue.length) {
        this.getTests()
      }
    },
    handleInput: debounce(function () {
      this.getTests()
    }, 500),

    next (params) {
      this.$router.push({ name: params || 'allTests' })
    },
    handleShowMenu () {
      this.showMenu = !this.showMenu
    },
    getTests () {
      this.showLoaderTest = true
      this.tests = []
      app.getSearchTest({ name: this.searchValue }).then((data) => {
        this.tests = data
        this.showLoaderTest = false
      }).catch(error => {
        this.showLoaderTest = false
        this.$store.dispatch('showError', error)
      })
    },
    exit () {
      this.$store.dispatch('initUser', {})
      this.$store.dispatch('clearToken')
      this.next('auth')
    }
  }
}
</script>
