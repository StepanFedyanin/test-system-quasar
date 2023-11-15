import { boot } from 'quasar/wrappers'
import helpers from 'src/utils/helpers'

export default boot(async ({ app, router }) => {
  app.config.globalProperties.$router = router
  app.use(helpers)
})
