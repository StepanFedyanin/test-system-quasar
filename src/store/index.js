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
<<<<<<< HEAD
    select_subtest: {}
=======
    select_subtest: {},
    start_timer: null
>>>>>>> d6bd2f8ba8b753f85da3066a46f570b11fb9940e
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
<<<<<<< HEAD
    },
    CLEAR_TOKENS (state) {
      state.access = null
      state.refresh = null
    },
    TOKENS (state, tokens) {
      state.access = tokens.access
      state.refresh = tokens.refresh
=======
>>>>>>> d6bd2f8ba8b753f85da3066a46f570b11fb9940e
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
    },
    CLEAR_TEST (state) {
      state.user = null
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
<<<<<<< HEAD
    token (context, payload) {
      context.commit('TOKENS', payload)
    },
    clearToken (context) {
      context.commit('CLEAR_TOKENS')
=======
    initTimer (context) {
      context.commit('INIT_TIMER')
    },
    clearTimer (context) {
      context.commit('CLEAR_TIMER')
    },
    clearTest (context) {
      context.commit('CLEAR_TEST')
>>>>>>> d6bd2f8ba8b753f85da3066a46f570b11fb9940e
    }
  }
})

export default store
