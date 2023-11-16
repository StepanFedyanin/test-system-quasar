import { boot } from 'quasar/wrappers'
import helpers from 'src/utils/helpers'
import breadcrumbs from 'vue-3-breadcrumbs'
export default boot(async ({ app, router }) => {
  app.config.globalProperties.$router = router
  app.use(breadcrumbs, {
    includeComponent: false
  })
  app.use(helpers)
})
