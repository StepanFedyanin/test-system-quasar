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
    select_subtest: {},
    start_timer: null
  }
}

const store = createStore({
  namespaced: true,
  state: () => ({
    test: null,
    user: null
  }),
  plugins: [vuexPersist.plugin],
  mutations: {
    INIT_USER (state, data) {
      state.user = data
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
    initTimer (context) {
      context.commit('INIT_TIMER')
    },
    clearTimer (context) {
      context.commit('CLEAR_TIMER')
    },
    clearTest (context) {
      context.commit('CLEAR_TEST')
    }
  }
})

export default store
