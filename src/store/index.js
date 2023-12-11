import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'
import { helpers as $helpers } from 'src/utils/helpers'

const vuexPersist = new VuexPersist({
  key: 'test-system'
  // storage: !process.env.SERVER && window.localStorage
})

const templateTest = (id) => {
  return {
    name: '',
    sdescription: '',
    test: id,
    answers: {},
    subtest: [],
    active_subtest: 0,
    select_subtest: {},
    start_timer: null
  }
}

const store = createStore({
  namespaced: true,
  state: () => ({
    test: {},
    user: {},
    access: null,
    refresh: null,
    error: null,
    data: {}
  }),
  plugins: [vuexPersist.plugin],
  mutations: {
    INIT_USER (state, data) {
      console.log(data, 'user')
      state.user = data
    },
    CLEAR_TOKENS (state) {
      state.access = null
      state.refresh = null
    },
    TOKENS (state, tokens) {
      state.access = tokens.access
      state.refresh = tokens.refresh
    },
    INIT_TEST (state, data) {
      state.test = { ...templateTest(data.id), ...$helpers.removeKeys(data, ['id']) }
    },
    UPDATE_TEST (state, data) {
      state.test = data
    },
    INIT_TIMER (state) {
      state.test = { ...state.test, start_timer: new Date() }
    },
    CLEAR_TIMER (state) {
      state.test = { ...state.test, start_timer: null }
    },
    ERROR (state, error) {
      state.error = error
    },
    DATA (state, params) {
      state.data[params.key] = params.data
    }
  },
  actions: {
    initUser (context, payload) {
      context.commit('INIT_USER', payload)
    },
    initTest (context, payload) {
      context.commit('INIT_TEST', payload)
    },
    updateTest (context, payload) {
      context.commit('UPDATE_TEST', payload)
    },
    token (context, payload) {
      context.commit('TOKENS', payload)
    },
    clearToken (context) {
      context.commit('CLEAR_TOKENS')
    },
    initTimer (context) {
      context.commit('INIT_TIMER')
    },
    clearTimer (context) {
      context.commit('CLEAR_TIMER')
    },
    showError (context, error) {
      context.commit('ERROR', error)
    },
    hideError (context) {
      context.commit('ERROR', null)
    },
    data (context, payload) {
      context.commit('DATA', payload)
    }
  }
})

export default store
