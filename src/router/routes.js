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
    children: [
      {
        path: '',
        name: 'testDescription',
        component: () => import('src/views/test-description.vue')
      }
    ]
  }
]

export default routes
