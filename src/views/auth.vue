<template>
  <div class="auth">
    <q-card class="card card__border card__wrapper">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="auth" label="Вход"/>
        <q-tab name="registration" label="Регистрация"/>
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="auth">
          <q-input borderless v-model="login.email" label="Email" class="q-mb-lg">
            <template v-slot:append>
                <q-icon name="person"/>
            </template>
          </q-input>
            <q-input class="q-mb-lg" borderless v-model="login.password" label="Пароль" :type="login.hiddenPassword ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon
                        :name="login.hiddenPassword ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="login.hiddenPassword = !login.hiddenPassword"
                    />
                </template>
            </q-input>
          <q-btn color="primary" class="full-width q-py-sm q-my-sm" :disable="disabledLogin" @click="onLogin()">Войти</q-btn>
          <q-btn flat class="full-width q-py-sm q-mb-sm">Забыли пароль?</q-btn>
          <q-separator class='q-mb-md'/>
          <q-btn color="primary" outline class="full-width q-py-sm" @click="next()">Войти без регистрации</q-btn>
        </q-tab-panel>

        <q-tab-panel name="registration">
          <q-input class="q-mb-md" borderless v-model="register.name" label="Имя"/>
          <q-input class="q-mb-md" borderless v-model="register.surname" label="Фамилия"/>
          <q-input class="q-mb-md" borderless v-model="register.gender" label="Пол"/>
          <q-input class="q-mb-md" borderless v-model="register.age" label="Дата рождения">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date  mask="YYYY-MM-DD" v-model="register.age">
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input class="q-mb-md" borderless v-model="register.email" label="Email"/>
          <q-input class="q-mb-lg" borderless v-model="register.password" label="Пароль" :type="register.hiddenPassword ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="register.hiddenPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="register.hiddenPassword = !register.hiddenPassword"
              />
            </template>
          </q-input>
          <q-btn color="primary" class="full-width q-mb-lg" :disable="disabledRegister" @click="onRegister()">Регистрация</q-btn>
          <div class="description text-h6 text-center">
            Регистрируясь, вы соглашаетесь с <span class="description__selected">пользовательским соглашением</span> и даете согласие на обработку <span class="description__selected">персональных данных</span>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import app from 'src/services/app'

export default {
  name: 'auth-page',
  data () {
    return {
      tab: 'auth',
      login: {
        email: '',
        password: '',
        hiddenPassword: true
      },
      register: {
        name: '',
        surname: '',
        gender: '',
        age: '',
        email: '',
        password: '',
        hiddenPassword: true
      },
      test: null
    }
  },
  created () {
    this.test = this.$store.state.test
  },
  computed: {
    disabledLogin () {
      return this.login.password.trim().length === 0 || this.login.email.trim().length === 0
    },
    disabledRegister () {
      return this.register.name.trim().length === 0 ||
        this.register.surname.trim().length === 0 ||
        this.register.gender.trim().length === 0 ||
        this.register.age.trim().length === 0 ||
        this.register.email.trim().length === 0 ||
        this.register.password.trim().length === 0
    }
  },
  methods: {
    next (params) {
      // if (this.test.attempt) {
      //   this.$router.go(-1)
      // }
      this.$router.push({ name: params || 'allTests' })
    },
    onLogin () {
      app.obtainToken(this.$helpers.removeKeys(this.login, ['hiddenPassword'])).then((data) => {
        this.$store.dispatch('initUser', data)
        this.next('profile')
      }).catch(() => {
      })
    },
    onRegister () {
      app.createUser(this.$helpers.removeKeys(this.register, ['hiddenPassword'])).then((data) => {
        this.$store.dispatch('initUser', data)
        this.next('profile')
      }).catch(() => {
      })
    }
  }
}
</script>
