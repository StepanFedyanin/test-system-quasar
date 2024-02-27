const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   meta: {
  //     title: 'Приветствие',
  //     requiresAuth: false,
  //     breadcrumb: false
  //   },
  //   component: () => import('src/views/home.vue')
  // },
  {
    path: '/auth',
    name: 'auth',
    meta: {
      title: 'Вход',
      requiresAuth: false,
      // breadcrumb: false
    },
    component: () => import('src/views/auth.vue')
  },
  {
    path: '/auth/:attempt',
    name: 'authAttempt',
    meta: {
      title: 'Вход',
      requiresAuth: false,
      // breadcrumb: false
    },
    component: () => import('src/views/auth.vue')
  },
  {
    path: '/',
    name: 'allTests',
    meta: {
      title: 'Все тесты',
      requiresAuth: false,
      // breadcrumb: false
    },
    redirect: { name: 'tests' },
    component: () => import('src/views/wrapper-all.vue'),
    children: [
      {
        path: '',
        name: 'tests',
        meta: {
          title: 'Все тесты',
          requiresAuth: false,
          current: false,
          // breadcrumb: false
        },
        component: () => import('src/views/all-tests.vue')
      },
      {
        path: 'test/:id*',
        name: 'test',
        meta: {
          title: 'ProTest',
          requiresAuth: false,
          current: false,
          // breadcrumb: false
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
              // breadcrumb () {
              //   return {
              //     label: 'replace',
              //     link: 'allTests',
              //     current: false,
              //     _path: ''
              //   }
              // }
            },
            component: () => import('src/views/test-description.vue')
          },
          {
            path: 'response',
            name: 'testResponse',
            meta: {
              title: 'Тест',
              requiresAuth: false,
              // breadcrumb: false
            },
            component: () => import('src/views/test-response.vue')
          },
          {
            path: 'finale/:attempt',
            name: 'testFinale',
            meta: {
              title: 'Заключение',
              requiresAuth: false,
              // breadcrumb () {
              //   return {
              //     label: 'Заключение',
              //     link: 'allTests',
              //     current: false,
              //     _path: '/finale'
              //   }
              // }
            },
            component: () => import('src/views/test-finale.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/authors',
    name: 'authors',
    meta: {
      title: 'Авторы',
      requiresAuth: false,
      // breadcrumb () {
      //   return {
      //     label: 'Авторы',
      //     link: 'authors',
      //     current: false,
      //     _path: ''
      //   }
      // }
    },
    redirect: { name: 'authorsTests' },
    component: () => import('src/views/wrapper-all.vue'),
    children: [
      {
        path: '',
        name: 'authorsTests',
        meta: {
          title: 'Авторы',
          requiresAuth: false,
          current: false,
          // breadcrumb () {
          //   return {
          //     label: 'Авторы',
          //     link: 'authors',
          //     current: false,
          //     _path: ''
          //   }
          // }
        },
        component: () => import('src/views/all-tests.vue')
      },
      {
        path: 'test/:id',
        name: 'authorsTest',
        meta: {
          title: 'ProTest',
          requiresAuth: false,
          current: false,
          // breadcrumb: false
        },
        component: () => import('src/views/test.vue'),
        redirect: { name: 'authorsTestDescription' },
        children: [
          {
            path: '',
            name: 'authorsTestDescription',
            meta: {
              title: 'Описание',
              requiresAuth: false,
              // breadcrumb () {
              //   return {
              //     label: 'replace',
              //     link: 'authors',
              //     current: false,
              //     _path: ''
              //   }
              // }
            },
            component: () => import('src/views/test-description.vue')
          },
          {
            path: 'response',
            name: 'authorsTestResponse',
            meta: {
              title: 'Тест',
              requiresAuth: false,
              // breadcrumb: false
            },
            component: () => import('src/views/test-response.vue')
          },
          {
            path: 'finale/:attempt',
            name: 'authorsTestFinale',
            meta: {
              title: 'Заключение',
              requiresAuth: false,
              // breadcrumb () {
              //   return {
              //     label: 'Заключение',
              //     link: 'authors',
              //     current: false,
              //     _path: '/finale'
              //   }
              // }
            },
            component: () => import('src/views/test-finale.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/topic',
    name: 'topic',
    meta: {
      title: 'Темы',
      requiresAuth: false,
      // breadcrumb () {
      //   return {
      //     label: 'Темы',
      //     link: 'allTests',
      //     current: false,
      //     _path: ''
      //   }
      // }
    },
    redirect: { name: 'topicTests' },
    component: () => import('src/views/wrapper-all.vue'),
    children: [
      {
        path: '',
        name: 'topicTests',
        meta: {
          title: 'Темы',
          requiresAuth: false,
          current: false,
          // breadcrumb () {
          //   return {
          //     label: 'Темы',
          //     link: 'topic',
          //     current: false,
          //     _path: ''
          //   }
          // }
        },
        component: () => import('src/views/all-tests.vue')
      },
      {
        path: 'test/:id',
        name: 'topicTest',
        meta: {
          title: 'ProTest',
          requiresAuth: false,
          current: false,
          // breadcrumb: false
        },
        component: () => import('src/views/test.vue'),
        redirect: { name: 'topicTestDescription' },
        children: [
          {
            path: '',
            name: 'topicTestDescription',
            meta: {
              title: 'Описание',
              requiresAuth: false,
              // breadcrumb () {
              //   return {
              //     label: 'replace',
              //     link: 'topic',
              //     current: false,
              //     _path: ''
              //   }
              // }
            },
            component: () => import('src/views/test-description.vue')
          },
          {
            path: 'response',
            name: 'topicTestResponse',
            meta: {
              title: 'Тест',
              requiresAuth: false,
              // breadcrumb: false
            },
            component: () => import('src/views/test-response.vue')
          },
          {
            path: 'finale/:attempt',
            name: 'topicTestFinale',
            meta: {
              title: 'Описание теста',
              requiresAuth: false,
              // breadcrumb () {
              //   return {
              //     label: 'Заключение',
              //     link: 'topic',
              //     current: false,
              //     _path: '/finale'
              //   }
              // }
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
      // breadcrumb () {
      //   return {
      //     label: 'Личный кабинет',
      //     link: 'profile',
      //     current: false
      //   }
      // }
    },
    component: () => import('src/views/profile.vue')
  },
  {
    path: '/passed_tests',
    name: 'passed_tests',
    meta: {
      title: 'Пройденные тесты',
      requiresAuth: true,
      // breadcrumb: false
    },
    component: () => import('src/views/wrapper-passed.vue'),
    children: [
      {
        path: '',
        name: 'passedTests',
        meta: {
          title: 'Пройденные тесты',
          requiresAuth: true,
          current: false,
          // breadcrumb () {
          //   return {
          //     label: 'Пройденные тесты',
          //     link: 'passedTests',
          //     current: false
          //   }
          // }
        },
        component: () => import('src/views/passed-tests.vue')
      },
      {
        path: 'test/:id',
        name: 'testPassed',
        meta: {
          title: 'ProTest',
          requiresAuth: true,
          current: false,
          // breadcrumb: false
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
              // breadcrumb () {
              //   return {
              //     label: 'replace',
              //     link: 'passedTests',
              //     current: false,
              //     _path: ''
              //   }
              // }
            },
            component: () => import('src/views/test-description.vue')
          },
          {
            path: 'response',
            name: 'testResponsePassed',
            meta: {
              title: 'Тест',
              requiresAuth: true,
              // breadcrumb () {
              //   return {
              //     label: 'Решение',
              //     link: 'passedTests',
              //     current: false
              //   }
              // }
            },
            component: () => import('src/views/test-response.vue')
          },
          {
            path: 'finale/:attempt',
            name: 'testFinalePassed',
            meta: {
              title: 'Заключение',
              requiresAuth: true,
              // breadcrumb () {
              //   return {
              //     label: 'Заключение',
              //     link: 'passedTests',
              //     current: false,
              //     _path: '/finale'
              //   }
              // }
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
      // breadcrumb: false
    },
    component: () => import('src/views/attempt-test.vue'),
    children: [
      {
        path: '',
        name: 'attemptTest',
        meta: {
          title: 'Заключение по ссылке',
          requiresAuth: false,
          // breadcrumb () {
          //   return {
          //     label: 'тест заключение',
          //     link: 'passedTests',
          //     current: false
          //   }
          // }
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
      // breadcrumb () {
      //   return {
      //     label: 'Администрирование',
      //     link: 'admin',
      //     current: false
      //   }
      // }
    },
    component: () => import('src/views/admin.vue'),
    children: [
      {
        path: '',
        name: 'adminContent',
        meta: {
          title: 'Администрирование',
          requiresAuth: false,
          // breadcrumb: false
        },
        component: () => import('src/views/admin-main.vue')
      },
      {
        path: 'test/:id',
        name: 'adminTest',
        meta: {
          title: 'Просмотр теста',
          requiresAuth: false,
          // breadcrumb () {
          //   return {
          //     label: 'replace теста',
          //     link: 'admin',
          //     current: false
          //   }
          // }
        },
        component: () => import('src/views/admin-test.vue')
      }
    ]
  },
  {
    path: '/error401',
    name: 'error401',
    meta: {
      title: 'error',
      requiresAuth: false,
      // breadcrumb: false
    },
    component: () => import('src/views/error401.vue')
  },
  {
    path: '/error404',
    name: 'error404',
    meta: {
      title: 'error',
      requiresAuth: false,
      // breadcrumb: false
    },
    component: () => import('src/views/error404.vue')
  }
]

export default routes
