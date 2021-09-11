import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'
import LoginOrSignup from '../views/LoginOrSignup.vue'
import User from '../views/User.vue'
import UserProducts from '../views/UserProducts.vue'
import Shop from '../views/Shop.vue'
import Cart from '../views/Cart.vue'
import Favorites from '../views/Favorites.vue'

const requireAuth = (to, from, next) => {
  if (store.state.currentUser.logedIn === false) {
    next({ name: 'Home' })
  } else {
    next()
  }

  return
}

const stayLogedIn = (to, from, next) => {
  if (store.state.currentUser.logedIn === true) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'LoginOrSignup',
    component: LoginOrSignup,
    beforeEnter: stayLogedIn,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    beforeEnter: requireAuth,
  },
  {
    path: '/userProducts',
    name: 'UserProducts',
    component: UserProducts,
    beforeEnter: requireAuth,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
    beforeEnter: requireAuth,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
