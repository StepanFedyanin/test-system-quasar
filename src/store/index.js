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
    test: null
  }),
  plugins: [vuexPersist.plugin],
  mutations: {
    ADD_TEST (state, data) {
      state.test = null
      state.test = templateTest(data)
    },
    UPDATE_TEST (state, data) {
      state.test = data
    }
  },
  actions: {
    addTest (context, payload) {
      context.commit('ADD_TEST', payload)
    },
    updateTest (context, payload) {
      context.commit('UPDATE_TEST', payload)
    }
  }
})

export default store
