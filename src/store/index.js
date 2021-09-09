import { createStore } from 'vuex'

export default createStore({
  state: {
    currentUser: {
      logedIn: false,
    },
    users: [],
  },
  mutations: {
    createUser(state, payload) {
      state.currentUser = payload
      state.users.push({ ...payload })
    },
    logOut(state) {
      const resetCurrenUser = {}
      state.currentUser = { logedIn: false, ...resetCurrenUser }
    },
    logIn(state, payload) {
      state.currentUser = payload
    },
  },
  actions: {},
  modules: {},
})
