<template>
  <div class="auth">
    <q-card class="card card__shadow card__border card__wrapper">
      <div
        class="loader"
        v-if="showLoader"
      >
        <q-circular-progress
          indeterminate
          rounded
          size="50px"
          color="primary"
          class="q-ma-md"
        />
      </div>
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
          <q-input class="q-mb-lg" borderless v-model="login.password" label="Пароль"
                   :type="login.hiddenPassword ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="login.hiddenPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="login.hiddenPassword = !login.hiddenPassword"
              />
            </template>
          </q-input>
          <q-btn color="primary" class="full-width q-py-sm q-my-sm" :disable="disabledLogin" @click="onLogin()">Войти
          </q-btn>
          <q-btn flat class="full-width q-py-sm q-mb-sm">Забыли пароль?</q-btn>
          <q-separator class='q-mb-md'/>
          <q-btn color="primary" outline class="full-width q-py-sm" @click="next()">Войти без регистрации</q-btn>
        </q-tab-panel>
        <q-tab-panel name="registration">
          <q-input class="q-mb-md" borderless v-model="register.name" label="Имя"/>
          <q-input class="q-mb-md" borderless v-model="register.surname" label="Фамилия"/>
          <q-select class="q-mb-md" v-model="register.gender" borderless :options="gender" label="Пол"/>
          <q-input class="q-mb-md" borderless v-model="register.age" mask="##-##-####" label="Дата рождения">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date mask="DD-MM-YYYY" v-model="register.age" landscape>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input class="q-mb-md" borderless v-model="register.email" label="Email"/>
          <q-input class="q-mb-lg" borderless v-model="register.password" label="Пароль"
                   :type="register.hiddenPassword ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="register.hiddenPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="register.hiddenPassword = !register.hiddenPassword"
              />
            </template>
          </q-input>
          <q-btn color="primary" class="full-width q-mb-lg" :disable="disabledRegister" @click="onRegister()">
            Регистрация
          </q-btn>
          <div class="description text-h6 text-center cursor-pointer" @click="showAgreementModal()">
            Регистрируясь, вы соглашаетесь с <span class="description__selected">пользовательским соглашением</span> и
            даете согласие на обработку <span class="description__selected">персональных данных</span>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <modal-wrapper title="Пользовательское соглашение" v-model="isShowAgreement">
      <div class="description text-secondary">
        <span class="description__selected">1. Предмет</span><br/>
        1.1. Администрация предоставляет неисключительную лицензию на использование Платформы и элементов Библиотеки и оказывает сопутствующие услуги самостоятельно, а также через аффилированные и/или дочерние компании.<br/>
        1.2. Пользователь использует Платформу и элементы Библиотеки согласно условиям Соглашения и выбранного Тарифа, а также уплачивает вознаграждение, если иное не предусмотрено Тарифом.<br/>
        <br/>
        <span class="description__selected">2. Общие положения</span><br/>
        2.1. Для использования Платформы Пользователь проходит регистрацию по адресу https://tilda.cc/registration/.<br/>
        2.2. После регистрации Пользователь получает уникальный Аккаунт и доступ в Личный кабинет.<br/>
        2.3. Все действия, совершаемые в Личном кабинете, считаются совершенными Пользователем лично.<br/>
        2.4. Пользователь самостоятельно несет ответственность за:<br/>
        a) Сохранность своего логина и пароля.<br/>
        b) Последствия в случае утери и/или разглашения логина и пароля третьим лицам.<br/>
        2.5. Администрация не рекомендует Пользователю передавать третьим лицам данные своего Аккаунта. В случае передачи данных Аккаунта Пользователь должен ознакомить третьих лиц с Соглашением и несет всю ответственность за их действия.<br/>
        2.6. Платформа не предназначена и не может использоваться детьми в возрасте до 16 лет. Проходя регистрацию, Пользователь гарантирует, что ему исполнилось 16 лет. Кроме того, если возраст Пользователя меньше 18 лет, он гарантирует, что у него есть согласие родителя или официального опекуна с условиями Соглашения.<br/>
      </div>
    </modal-wrapper>
  </div>
</template>

<script>
import { app } from 'src/services'
import ModalWrapper from 'components/modal.vue'

export default {
  name: 'auth-page',
  components: { ModalWrapper },
  data () {
    return {
      tab: 'auth',
      showLoader: false,
      token: null,
      gender: [
        'мужской',
        'женский'
      ],
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
      isShowAgreement: false
    }
  },
  created () {
    this.token = this.$store.state.access
    if (this.token) {
      this.next('profile')
    }
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
    showAgreementModal () {
      this.isShowAgreement = true
    },
    next (params) {
      this.$router.push({ name: params || 'allTests' })
    },
    onLogin () {
      this.showLoader = true
      app.obtainToken(this.$helpers.removeKeys(this.login, ['hiddenPassword'])).then((res) => {
        if (res.access && res.refresh) {
          this.$store.dispatch('token', res)
          this.showLoader = false
          this.next('profile')
        }
        this.showLoader = false
      }).catch(() => {
        this.showLoader = false
      })
    },
    onRegister () {
      this.showLoader = true
      app.createUser(this.$helpers.removeKeys(this.register, ['hiddenPassword'])).then((res) => {
        if (res.access && res.refresh) {
          this.$store.dispatch('token', res)
          app.getUser().then(user => {
            this.showLoader = false
            this.$store.dispatch('initUser', user)
            this.next('profile')
          }).catch(() => {
            this.showLoader = false
          })
        }
        this.showLoader = false
      }).catch(() => {
        this.showLoader = false
      })
    }
  }
}
</script>
