import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'nashel'
  // storage: window.localStorage
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
    test: null,
    user: {},
    access: null,
    refresh: null
  }),
  plugins: [vuexPersist.plugin],
  mutations: {
    INIT_USER (state, data) {
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
    ADD_TEST (state, data) {
      state.test = null
      state.test = templateTest(data)
    },
    UPDATE_TEST (state, data) {
      state.test = data
    },
    INIT_TIMER (state) {
      state.test = { ...state.test, start_timer: new Date() }
    },
    CLEAR_TIMER (state) {
      state.test = { ...state.test, start_timer: null }
    }
  },
  actions: {
    initUser (context, payload) {
      context.commit('INIT_USER', payload)
    },
    addTest (context, payload) {
      context.commit('ADD_TEST', payload)
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
    }
  }
})

export default store
