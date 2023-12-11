import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from 'src/store'
import { helpers } from 'src/utils/helpers'
import { app } from 'src/services'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const router = createRouter({
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        // document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
        if (to.query.page) return
        return new Promise((resolve) => {
          resolve({ left: 0, top: 0 })
        })
      }
    },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })
  router.beforeEach((to, from, next) => {
    if (store.state.refresh) {
      const jwt = helpers.parseJwt(store.state.access)
      const expDate = new Date(jwt.exp * 1000)
      if (expDate - new Date() < 60 * 60 * 1000) {
        const tokens = {
          access: store.state.access,
          refresh: store.state.refresh
        }
        app.refreshToken(tokens.refresh).then((token) => {
          tokens.access = token.access
          store.dispatch('token', tokens)
        })
      }
    }
    if (to.matched.some(record => record.meta.requiresAuth) && !process.env.SERVER) {
      if (store.state.access) {
        const jwt = helpers.parseJwt(store.state.access)
        const expDate = new Date(jwt.exp * 1000)
        if (expDate < new Date()) {
          next({ name: 'auth' })
        } else {
          next()
        }
      } else {
        next({ name: 'auth' })
      }
    } else {
      next()
    }
  })
  return router
})
