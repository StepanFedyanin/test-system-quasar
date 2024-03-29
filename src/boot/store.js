import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ store }) => {
  // console.log(Object.assign(store.state, window.__INITIAL_STATE__).meta, 'meta')
  // // For Vuex
  // if (window.__INITIAL_STATE__) {
  //   store.replaceState(Object.assign(window.__INITIAL_STATE__, {
  //     ...store.state,
  //     meta: store.state.meta
  //   }))
  // }
  // console.log(Object.assign(window.__INITIAL_STATE__, store.state))
  // For Vuex
  if (window.__INITIAL_STATE__) store.replaceState({ ...Object.assign(window.__INITIAL_STATE__, store.state), meta: store.state.meta })
})
