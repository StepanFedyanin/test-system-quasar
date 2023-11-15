const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('src/views/home.vue')
  },
  {
    path: '/all_tests',
    name: 'all_tests',
    component: () => import('src/views/wrapper-all.vue'),
    children: [
      {
        path: '',
        name: 'allTests',
        component: () => import('src/views/all-tests.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('src/views/test.vue'),
    redirect: { name: 'testDescription' },
    children: [
      {
        path: '',
        name: 'testDescription',
        component: () => import('src/views/test-description.vue')
      },
      {
        path: 'response',
        name: 'testResponse',
        component: () => import('src/views/test-response.vue')
      },
      {
        path: 'finale',
        name: 'testFinale',
        component: () => import('src/views/test-finale.vue')
      }
    ]
  }
]

export default routes
