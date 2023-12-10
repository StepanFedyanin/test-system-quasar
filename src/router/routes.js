const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Приветствие',
      requiresAuth: false,
      breadcrumb: false
    },
    component: () => import('src/views/home.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    meta: {
      title: 'Вход',
      requiresAuth: false,
      breadcrumb: false
    },
    component: () => import('src/views/auth.vue')
  },
  {
    path: '/all_tests',
    name: 'all_tests',
    meta: {
      title: 'Все тесты',
      requiresAuth: false,
      breadcrumb: false
    },
    redirect: { name: 'allTests' },
    component: () => import('src/views/wrapper-all.vue'),
    children: [
      {
        path: '',
        name: 'allTests',
        meta: {
          title: 'ProTest',
          requiresAuth: false,
          current: false,
          breadcrumb () {
            return {
              label: 'Все тесты',
              link: 'allTests',
              current: false
            }
          }
        },
        component: () => import('src/views/all-tests.vue')
      },
      {
        path: 'test/:id',
        name: 'test',
        meta: {
          title: 'ProTest',
          requiresAuth: false,
          current: false,
          breadcrumb: false
        },
        component: () => import('src/views/test.vue'),
        redirect: { name: 'testDescription' },
        children: [
          {
            path: '',
            name: 'testDescription',
            meta: {
              title: 'Описание',
              requiresAuth: false,
              breadcrumb () {
                return {
                  label: 'replace',
                  link: 'allTests',
                  current: false,
                  _path: ''
                }
              }
            },
            component: () => import('src/views/test-description.vue')
          },
          {
            path: 'response',
            name: 'testResponse',
            meta: {
              title: 'Тест',
              requiresAuth: false,
              breadcrumb () {
                return {
                  label: 'Решение',
                  link: 'allTests',
                  current: false
                }
              }
            },
            component: () => import('src/views/test-response.vue')
          },
          {
            path: 'finale/:attempt',
            name: 'testFinale',
            meta: {
              title: 'Описание теста',
              requiresAuth: false,
              breadcrumb () {
                return {
                  label: 'Заключение',
                  link: 'allTests',
                  current: false,
                  _path: '/finale'
                }
              }
            },
            component: () => import('src/views/test-finale.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'Профиль',
      requiresAuth: true,
      breadcrumb () {
        return {
          label: 'Личный кабинет',
          link: 'allTests',
          current: false
        }
      }
    },
    component: () => import('src/views/profile.vue')
  },
  {
    path: '/passed_tests',
    name: 'passed_tests',
    meta: {
      title: 'Пройденные тесты',
      requiresAuth: true,
      breadcrumb: false
    },
    component: () => import('src/views/wrapper-passed.vue'),
    children: [
      {
        path: '',
        name: 'passedTests',
        meta: {
          title: 'ProTest',
          requiresAuth: true,
          current: false,
          breadcrumb () {
            return {
              label: 'Пройденные тесты',
              link: 'passedTests',
              current: false
            }
          }
        },
        component: () => import('src/views/passed-tests.vue')
      },
      {
        path: 'test',
        name: 'testPassed',
        meta: {
          title: 'ProTest',
          requiresAuth: true,
          current: false,
          breadcrumb: false
        },
        component: () => import('src/views/test.vue'),
        redirect: { name: 'testDescriptionPassed' },
        children: [
          {
            path: '',
            name: 'testDescriptionPassed',
            meta: {
              title: 'Описание',
              requiresAuth: true,
              breadcrumb () {
                return {
                  label: 'replace',
                  link: 'passedTests',
                  current: false,
                  _path: ''
                }
              }
            },
            component: () => import('src/views/test-description.vue')
          },
          {
            path: 'response',
            name: 'testResponsePassed',
            meta: {
              title: 'Тест',
              requiresAuth: true,
              breadcrumb () {
                return {
                  label: 'Решение',
                  link: 'passedTests',
                  current: false
                }
              }
            },
            component: () => import('src/views/test-response.vue')
          },
          {
            path: 'finale/:attempt',
            name: 'testFinalePassed',
            meta: {
              title: 'Заключение',
              requiresAuth: true,
              breadcrumb () {
                return {
                  label: 'Заключение',
                  link: 'passedTests',
                  current: false,
                  _path: '/finale'
                }
              }
            },
            component: () => import('src/views/test-finale.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/attempt/:attempt',
    name: 'attempt',
    redirect: { name: 'attemptTest' },
    meta: {
      title: 'Заключение по ссылке',
      requiresAuth: false,
      breadcrumb: false
    },
    component: () => import('src/views/attempt-test.vue'),
    children: [
      {
        path: '',
        name: 'attemptTest',
        meta: {
          title: 'Заключение по ссылке',
          requiresAuth: false,
          breadcrumb () {
            return {
              label: 'тест заключение',
              link: 'passedTests',
              current: false
            }
          }
        },
        component: () => import('src/views/test-finale.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: { name: 'adminContent' },
    meta: {
      title: 'Панель администрирования',
      requiresAuth: false,
      breadcrumb () {
        return {
          label: 'Администрирование',
          link: 'admin',
          current: false
        }
      }
    },
    component: () => import('src/views/admin.vue'),
    children: [
      {
        path: '',
        name: 'adminContent',
        meta: {
          title: 'Администрирование',
          requiresAuth: false,
          breadcrumb () {
            return {
              label: 'Администрирование',
              link: 'admin',
              current: false
            }
          }
        },
        component: () => import('src/views/admin-main.vue')
      },
      {
        path: 'create_test',
        name: 'adminTest',
        meta: {
          title: 'Добавление теста',
          requiresAuth: false,
          breadcrumb () {
            return {
              label: 'Добавление теста',
              link: 'admin',
              current: false
            }
          }
        },
        component: () => import('src/views/admin-test.vue')
      }
    ]
  }
]

export default routes
