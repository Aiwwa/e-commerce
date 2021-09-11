<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/shop">E-Shop</router-link>
    <div v-if="this.$store.state.currentUser.logedIn">
      <router-link to="/userProducts">My Products</router-link>
    </div>
    <div v-if="this.$store.state.currentUser.logedIn">
      <router-link to="/cart">Cart</router-link>
    </div>
    <div v-if="this.$store.state.currentUser.logedIn">
      <router-link to="/favorites">Favorite Products</router-link>
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
  <router-view />
</template>

<script>
import { onMounted, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'

export default {
  setup() {
    // const store = useStore()
    // const user = ref('')
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
}

#nav {
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 30px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  div {
    margin: 0 20px;
  }
}
</style>
