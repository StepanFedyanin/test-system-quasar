<template>
    <top-bar class="q-mb-lg"/>
    <div class="profile row justify-between">
        <div class="card row col-12 col-sm-5 col-lg-3 q-pa-lg q-mb-xl">
            <div class="row col-12 justify-between items-center q-mb-lg q-px-sm">
                <div class="cover">
                    <span/>
                </div>
                <div class="col-8 col-sm-6 text-primary text-bold text-h3 q-mb-sm">
                    {{user.name}}<br/>
                    {{user.surname}}
                </div>
            </div>
            <q-input ref="name" :readonly="userForm.name" @blur="blurInput('name')" rounded standout="bg-primary text-white" v-model="user.name" label="Имя"
                     class="col-6 col-sm-12 q-mb-md q-px-sm">
                <template v-slot:append>
                    <q-icon class="cursor-pointer" name="border_color" @click="focusInput('name')" size="17px"/>
                </template>
            </q-input>
            <q-input ref="surname" :readonly="userForm.surname" @blur="blurInput('surname')" rounded standout="bg-primary text-white" v-model="user.surname" label="Фамилия"
                     class="col-6 col-sm-12 q-mb-md q-px-sm">
                <template v-slot:append>
                    <q-icon class="cursor-pointer" name="border_color" @click="focusInput('surname')" size="17px"/>
                </template>
            </q-input>

            <q-select v-if="!userForm.gender" class="col-6 col-sm-12 q-mb-md q-px-sm" bg-color="primary" ref="gender"  v-model="user.gender" borderless :options="gender" label-color="white" label="Пол"/>
            <q-input v-else :readonly="userForm.gender" @blur="blurInput('gender')" rounded standout="bg-primary text-white" v-model="user.gender" label="Пол"
                     class="col-6 col-sm-12 q-mb-md q-px-sm">
              <template v-slot:append>
                <q-icon class="cursor-pointer" name="border_color" @click="focusInput('gender')" size="17px"/>
              </template>
            </q-input>

            <q-input ref="age" :readonly="userForm.birthday" @blur="blurInput('age')" rounded standout="bg-primary text-white" v-model="user.age" mask="####-##-##" label="Дата рождения"
                     class="col-6 col-sm-12 q-mb-md q-px-sm">
                <template v-slot:append>
                    <q-icon class="cursor-pointer" name="border_color" @click="focusInput('age')" size="17px"/>
                </template>
            </q-input>
            <q-input ref="email" :readonly="userForm.email" @blur="blurInput('email')" rounded standout="bg-primary text-white" v-model="user.email" label="Email" class="col-12 q-mb-md q-px-sm">
                <template v-slot:append>
                    <q-icon class="cursor-pointer" name="border_color" @click="focusInput('email')" size="17px"/>
                </template>
            </q-input>
            <div class="col-12 q-mb-md q-px-sm">
                <div class="text-secondary text-weight-bold q-mb-sm">Впишите старый пароль</div>
                <q-input rounded standout="bg-primary text-white" class="full-width" v-model="user.old_password"
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
            <div class="col-12 q-mb-md q-px-sm">
                <div class="text-secondary text-weight-bold q-mb-sm">Придумайте новый пароль</div>
                <q-input rounded standout="bg-primary text-white" class="full-width" v-model="user.password"
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
          <div class="full-width">
            <q-btn class="full-width q-py-sm" color="primary" @click="updateUser()">Сохранить</q-btn>
          </div>
        </div>
        <div class="profile__tests col-12 col-sm-6 col-lg-8">
            <breadcrumbs-menu/>
            <div class="profile__list">
                <div class="full-width q-mb-md">
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
                <q-btn color="primary" class="q-px-lg q-mb-xl">Все тесты</q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import TopBar from 'components/top-bar.vue'
import BreadcrumbsMenu from 'components/breadcrumb.vue'
import { app } from 'src/services'

export default {
  name: 'profile-page',
  data () {
    return {
      gender: [
        'мужской',
        'женский'
      ],
      user: {},
      userForm: {
        name: true,
        surname: true,
        gender: true,
        birthday: true,
        email: true,
        password: true,
        old_password: true
      }
    }
  },
  created () {
    this.user = {
      ...this.$store.state.user,
      password: '',
      old_password: ''
    }
  },
  components: { BreadcrumbsMenu, TopBar },
  methods: {
    updateUser () {
      app.updateUser(this.user).then(() => {
      })
    },
    blurInput (key) {
      this.userForm[key] = true
    },
    focusInput (key) {
      this.userForm[key] = false
      this.$nextTick(() => {
        this.$refs[key].focus()
      })
    },
    next () {
      this.$router.push({ name: name || 'passedTests' })
    }
  }
}
</script>
