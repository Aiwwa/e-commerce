import { createStore } from 'vuex'

export default createStore({
  state: {
    currentUser: {
      logedIn: false,
    },
    users: [],
  },
  mutations: {
    //Login/logout
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
    //SingleUserProducts
    addSingleProduct(state, payload) {
      state.currentUser.products.push({ ...payload })

      console.log(state.currentUser.products)
    },
  },
  actions: {},
  modules: {},
})
