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
              link: 'tests',
              current: false
            }
          }
        },
        component: () => import('src/views/all-tests.vue')
      },
      {
        path: 'test',
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
                  label: 'Описание',
                  link: 'test',
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
                  label: '',
                  link: 'test',
                  current: false
                }
              }
            },
            component: () => import('src/views/test-response.vue')
          },
          {
            path: 'finale',
            name: 'testFinale',
            meta: {
              title: 'Описание теста',
              requiresAuth: false,
              breadcrumb () {
                return {
                  label: 'тест заключение',
                  link: 'test',
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
  }
]

export default routes
