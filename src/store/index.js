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
    },
    logOut({ currentUser }) {
      console.log(currentUser)
      currentUser.logedIn = false
    },
  },
  actions: {},
  modules: {},
})
