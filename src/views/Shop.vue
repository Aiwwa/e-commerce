<template>
  <div>E-Shop</div>
  <div v-for="(product, index) in productsUI" :key="index" class="wrapper">
    <div>{{ product.title }}</div>
    <div>{{ product.price }}</div>
    <div>{{ product.createdBy }}</div>
    <div>{{ product.isFav }}</div>
    <div>{{ product.favorites }}</div>
    <button
      v-if="
        state.currentUser.name !== product.createdBy &&
        state.currentUser.logedIn
      "
      @click="handleAddToCart(product)"
    >
      Add to cart
    </button>
    <button
      v-if="
        state.currentUser.name !== product.createdBy &&
        state.currentUser.logedIn &&
        !product.isFav
      "
      @click="handleAddToFavorites(product)"
    >
      Add to favorites
    </button>
  </div>
</template>

<script>
import { onMounted, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  setup(props) {
    const store = useStore()
    const { state } = useStore()

    const products = ref([])
    const productsUI = ref([])

    //Functions
    const setProducts = () => {
      products.value.forEach((el) => {
        el.forEach((product) => {
          productsUI.value.push(product)
        })
      })
    }

    const handleAddToFavorites = (product) => {
      store.commit('updatefavoriteProducts', product)
      products.value = state.users.map((user) => user._value.products)
    }

    const handleAddToCart = (product) => {
      console.log(product)
      store.commit('handleAddToCart', product)
    }

    //Hooks
    onMounted(() => {
      products.value = state.users.map((user) => user._value.products)
      setProducts()
    })

    onUpdated(() => {})

    return {
      products,
      productsUI,
      state,
      handleAddToFavorites,
      handleAddToCart,
    }
  },
}
</script>

<style>
.wrapper {
  margin: 20px;
}
</style>
