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

const templateUser = (token) => {
  return {
    token
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
      state.user = null
      state.user = templateUser(data)
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
    }
  }
})

export default store
