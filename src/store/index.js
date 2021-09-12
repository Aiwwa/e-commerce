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
      state.currentUser.products.push({ ...payload, isFav: false })
    },
    removeSingleProduct(state, payload) {
      state.currentUser.products = payload
    },
    updatefavoriteProducts(state, payload) {
      // state.currentUser.favorites.push({ ...payload, isFav: true })
      // console.log('payload', payload)
      // console.log('curr user', state.currentUser)
      // console.log('state users', state.users)
    },

    //Cart
    handleAddToCart(state, payload) {
      state.currentUser.cart.push(payload)
    },
    removeProductFromCart(state, payload) {
      state.currentUser.cart = payload
    },
    plusCartPrice(state, payload) {
      let updatedItem = state.currentUser.cart.find(
        (el) => el.title === payload.title,
      )

      let sum = Number(updatedItem.sum)
      sum += Number(payload.price)
      updatedItem.sum = sum

      state.currentUser.totalSum += Number(updatedItem.price)
    },
    minusCartPrice(state, payload) {
      console.log('minus', payload)
      let updatedItem = state.currentUser.cart.find(
        (el) => el.title === payload.title,
      )

      if (updatedItem.sum > 0) {
        let sum = Number(updatedItem.sum)
        sum -= Number(payload.price)
        updatedItem.sum = sum

        state.currentUser.totalSum -= Number(updatedItem.price)
      }
    },
    minusPriceOnRemove(state, payload) {
      if (payload.sum === 0 || payload.sum === '' || payload.sum === null) {
        state.currentUser.totalSum -= Number(payload.price)
      } else {
        state.currentUser.totalSum -= Number(payload.sum)
        payload.sum = 0
      }
    },
  },
  actions: {},
  modules: {},
})
