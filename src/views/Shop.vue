<template>
  <div>E-Shop</div>
  <div v-for="(product, index) in productsUI" :key="index" class="wrapper">
    <div>{{ product.title }}</div>
    <div>{{ product.price }}</div>
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
    <div v-if="state.currentUser.logedIn">
      <router-link :to="{ name: 'SingleProduct', params: { id: product.id } }">
        More
      </router-link>
    </div>
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
      store.commit('addToFavorites', product)
    }

    const handleAddToCart = (product) => {
      store.commit('handleAddToCart', product)
    }

    //Hooks
    onMounted(() => {
      products.value = state.users.map((user) => user._value.products)
      setProducts()
    })

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
