import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'test-system',
  storage: window.localStorage
})

const templateTest = (id) => {
  return {
    name: '',
    sdescription: '',
    test: id,
    answers: [],
    subtest: [],
    active_subtest: 0,
    select_subtest: {}
  }
}

const store = createStore({
  namespaced: true,
  state: () => ({
    test: null,
    user: null,
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
    }
  }
})

export default store
