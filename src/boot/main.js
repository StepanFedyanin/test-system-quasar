import { boot } from 'quasar/wrappers'
import helpers from 'src/utils/helpers'
import breadcrumbs from 'vue-3-breadcrumbs'
import * as Sentry from '@sentry/vue'
export default boot(async ({ app, router }) => {
  app.config.globalProperties.$router = router
  app.config.globalProperties.$router = router
    // Sentry.init({
    //   app,
    //   dsn: 'http://6a9feecdbeda4557a66747f03b874c3c@94.228.112.174//2',
    //   integrations: [
    //     new Sentry.BrowserTracing({
    //       // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    //       tracePropagationTargets: ['localhost', /^https:\/\/tests.flexidev\.ru\/api/],
    //       routingInstrumentation: Sentry.vueRouterInstrumentation(router)
    //     }),
    //     new Sentry.Replay()
    //   ],
    //   // Performance Monitoring
    //   tracesSampleRate: 1.0, // Capture 100% of the transactions
    //   // Session Replay
    //   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    //   replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    // })
  app.use(breadcrumbs, {
    includeComponent: false
  })
  app.use(helpers)
})
