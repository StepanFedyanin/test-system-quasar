<template>
  <top-bar class="q-mb-lg"/>
  <div class="profile row justify-between q-pb-lg">
    <q-no-ssr>
      <q-form class="card profile__form row col-12 col-sm-5 col-lg-3 q-pa-lg ">
        <div class="flex col-12 items-center q-mb-lg q-px-sm">
          <div class="cover q-mr-md">
            <span/>
          </div>
          <div class="col row text-primary text-bold text-h3 q-mb-sm">
            <span class="text-pruning col-12">{{ user.name }}</span>
            <span class="text-pruning col-12">{{ user.surname }}</span>
          </div>
        </div>
        <q-input ref="name" :readonly="userForm.name" @blur="blurInput('name')" borderless v-model="changedUser.name"
                 label="Имя"
                 class="col-6 col-sm-12 q-mb-md q-px-sm">
          <template v-slot:append>
            <q-icon class="cursor-pointer" name="border_color" @click="focusInput('name')" size="17px"/>
          </template>
        </q-input>
        <q-input ref="surname" :readonly="userForm.surname" @blur="blurInput('surname')" borderless
                 v-model="changedUser.surname" label="Фамилия"
                 class="col-6 col-sm-12 q-mb-md q-px-sm">
          <template v-slot:append>
            <q-icon class="cursor-pointer" name="border_color" @click="focusInput('surname')" size="17px"/>
          </template>
        </q-input>

        <q-select v-if="!userForm.gender" @blur="blurInput('gender')" class="col-6 col-sm-12 q-mb-md q-px-sm"
                  ref="gender" clearable="done" v-model="changedUser.gender" borderless :options="gender" label="Пол"/>
        <q-input v-else :readonly="userForm.gender" @blur="blurInput('gender')" borderless v-model="changedUser.gender"
                 label="Пол"
                 class="col-6 col-sm-12 q-mb-md q-px-sm">
          <template v-slot:append>
            <q-icon class="cursor-pointer" name="border_color" @click="focusInput('gender')" size="17px"/>
          </template>
        </q-input>

        <q-input ref="birthday" :readonly="userForm.birthday" @blur="blurInput('birthday')" borderless
                 v-model="changedUser.birthday" mask="##.##.####" label="Дата рождения"
                 class="col-6 col-sm-12 q-mb-md q-px-sm">
          <template v-slot:append>
            <q-icon class="cursor-pointer" name="border_color" @click="focusInput('birthday')" size="17px"/>
          </template>
        </q-input>
        <q-input ref="email" :readonly="userForm.email" @blur="blurInput('email')" borderless
                 v-model="changedUser.email" label="Email" class="col-12 q-mb-md q-px-sm">
          <template v-slot:append>
            <q-icon class="cursor-pointer" name="border_color" @click="focusInput('email')" size="17px"/>
          </template>
        </q-input>
        <div class="col-12 q-mb-md q-px-sm">
          <div class="text-secondary text-weight-bold q-mb-sm">Придумайте новый пароль</div>
          <q-input borderless class="full-width" v-model="user.changedUser"
                   :type="userForm.password ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="userForm.password ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="userForm.password = !userForm.password"
              />
            </template>
          </q-input>
        </div>
        <div class="col-12 q-mb-md q-px-sm">
          <div class="text-secondary text-weight-bold q-mb-sm">Впишите старый пароль <span class="text-primary">*</span>
          </div>
          <q-input borderless class="full-width" v-model="changedUser.old_password"
                   :type="userForm.old_password ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="userForm.old_password ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="userForm.old_password = !userForm.old_password"
              />
            </template>
          </q-input>
        </div>
        <div class="full-width">
          <q-btn :disable="changeDisabledUpdate" class="full-width q-py-sm" color="primary" @click="updateUser()">
            Сохранить
          </q-btn>
        </div>
      </q-form>
    </q-no-ssr>
    <div class="profile__tests col-12 col-sm-6 col-lg-8">
      <div class='flex justify-between items-center q-mb-xl'>
		  <breadcrumbs-menu :breadcrumbs="[
           { name: 'Профиль', route: { name: 'allTests' } },
          ]"
		  />
        <AppError />
      </div>
      <div
        v-if="showLoaderTests"
        class="loader"
      >
        <q-circular-progress
          indeterminate
          rounded
          size="50px"
          color="primary"
          class="q-ma-md"
        />
      </div>
      <div v-else-if="attempts.length > 0" class="profile__list">
        <div v-for="attempt in attempts" :key="`attempt_${attempt.test_id}`" class="full-width q-mb-md">
          <router-link :to="{name:'testPassed' , params: {id:attempt.test_id }}" class="card description__point test__passed items-center">
            {{ attempt.test }}
            <span class="text-primary row items-center">
              {{ $helpers.stringForNumber(attempt.count, ['попытка', 'попытки', 'попыток']) }}
              <q-icon color="primary" name="chevron_right"/>
            </span>
          </router-link>
        </div>
      </div>
      <div v-else class="profile__list">
        <span class="text-secondary text-h3 full-width text-center">
         вы еще не проходили тесты
        </span>
      </div>
      <div class="flex justify-end">
        <q-btn color="primary" class="q-px-lg" @click="next('passedTests')">Все тесты</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from 'components/top-bar.vue'
import BreadcrumbsMenu from 'components/breadcrumb.vue'
import { app } from 'src/services'
import AppError from 'components/app-error.vue'

export default {
  name: 'profile-page',
  components: { AppError, BreadcrumbsMenu, TopBar },
  data () {
    return {
      gender: [
        'мужской',
        'женский'
      ],
      user: {},
      changedUser: {},
      userForm: {
        name: true,
        surname: true,
        gender: true,
        birthday: true,
        email: true,
        password: true,
        old_password: true
      },
      attempts: [],
      showLoaderTests: false,
      showLoaderUser: false
    }
  },
  created () {
    this.user = this.$store.state.user
    this.changedUser = {
      ...this.$store.state.user,
      password: '',
      old_password: ''
    }
    this.getAttempt()
  },
  computed: {
    changeDisabledUpdate () {
      for (const key in this.user) {
        if (this.changedUser[key] !== this.user[key] && this.changedUser.old_password.trim() !== '') {
          return false
        }
      }
      return true
    }
  },
  methods: {
    getAttempt () {
      this.showLoaderTests = true
      app.getAttemptForUser().then((data) => {
        this.showLoaderTests = false
        this.attempts = data
      }).catch(() => {
        this.showLoaderTests = false
      })
    },
    getUpdateData () {
      const user = {}
      for (const key in this.changedUser) {
        if (this.changedUser[key] !== this.user[key] && this.changedUser[key] !== '') {
          user[key] = this.changedUser[key]
        }
      }
      return user
    },
    updateUser () {
      app.updateUser(this.getUpdateData()).then((user) => {
        this.$store.dispatch('initUser', user)
        this.user = this.$store.state.user
      }).catch((err) => {
        this.$store.dispatch('showError', err)
      })
    },
    blurInput (key) {
      this.userForm[key] = true
    },
    focusInput (key) {
      this.userForm[key] = false
      this.$nextTick(() => {
        this.$refs[key].focus()
        if (key === 'gender') {
          this.$refs[key]?.showPopup()
        }
      })
    },
    next (name, id) {
      if (id) {
        this.$store.dispatch('addTest', id)
        this.$router.push({ name: name || 'testPassed', params: { id } })
      }
      this.$router.push({ name: name || 'allTests' })
    }
  }
}
</script>
