<template>
  <div class="auth">
    <q-card class="card q-px-xl q-py-xl">
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
          <q-input borderless v-model="text" label="Email" class="q-mb-lg">
            <template v-slot:append>
              <img src="assets/img/icon/user.svg" alt="1"/>
            </template>
          </q-input>
          <q-input borderless v-model="text" label="Пароль">
            <template v-slot:append>
              <img src="assets/img/icon/user.svg" alt="1"/>
            </template>
          </q-input>
          <q-btn color="primary" class="full-width q-py-sm q-my-sm">Войти</q-btn>
          <q-btn flat class="full-width q-py-sm q-mb-sm">Забыли пароль?</q-btn>
          <q-separator class='q-mb-md'/>
          <q-btn color="primary" outline class="full-width q-py-sm" @click="next()">Войти без регистрации</q-btn>
        </q-tab-panel>

        <q-tab-panel name="registration">
          <q-input class="q-mb-sm" borderless v-model="text" label="Имя"/>
          <q-input class="q-mb-sm" borderless v-model="text" label="Фамилия"/>
          <q-input class="q-mb-sm" borderless v-model="text" label="Пол"/>
          <q-input class="q-mb-sm" borderless v-model="date" mask="date" label="Дата рождения">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="date">
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input class="q-mb-sm" borderless v-model="date" label="Email"/>
          <q-input class="q-mb-lg" borderless v-model="password" label="Пароль" :type="isPwd ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn color="primary" class="full-width q-mb-lg">Регистрация</q-btn>
          <div class="description text-h6 text-center">
            Регистрируясь, вы соглашаетесь с <span class="description__selected">пользовательским соглашением</span> и даете согласие на обработку <span class="description__selected">персональных данных</span>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'auth-page',
  data () {
    return {
      tab: 'auth'
    }
  },
  methods: {
    next (params) {
      this.$router.push({ name: params || 'allTests' })
    }
  }
}
</script>
