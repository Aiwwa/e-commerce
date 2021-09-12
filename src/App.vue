<template>
  <div id="nav">
    <div><router-link to="/">Home</router-link></div>
    <div>
      <router-link to="/shop">E-Shop</router-link>
      <div v-if="this.$store.state.currentUser.logedIn">
        <router-link to="/userProducts">My Products</router-link>
      </div>
      <div v-if="this.$store.state.currentUser.logedIn">
        <router-link to="/cart">Cart</router-link>
        {{ $store.state.currentUser.cart.length }}
      </div>
      <div v-if="this.$store.state.currentUser.logedIn">
        <router-link to="/favorites">Favorite Products</router-link>
        {{ $store.state.currentUser.favorites.length }}
      </div>
      <div v-if="!this.$store.state.currentUser.logedIn">
        <router-link to="/login">
          Log in
        </router-link>
      </div>
      <div v-else>
        <router-link to="/user">
          Account
        </router-link>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script>
import { onMounted, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'

export default {
  setup() {
    const store = useStore()
    const user = ref('')
    return {}
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 18px;
}

#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(224, 223, 229);
  border-bottom: 1px solid rgb(192, 192, 192);

  div:nth-child(2) {
    display: flex;
    align-items: center;
  }

  a {
    font-weight: bold;
    color: black;
    padding: 30px;
    text-decoration: none;

    &.router-link-exact-active {
      color: rgb(122, 91, 24);
    }
  }

  div {
    margin: 0 20px;
  }
}
</style>
