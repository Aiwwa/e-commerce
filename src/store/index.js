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
      state.users.push(payload)
    },
    logOut({ currentUser, users }) {
      currentUser.logedIn = false
    },
  },
  actions: {},
  modules: {},
})
