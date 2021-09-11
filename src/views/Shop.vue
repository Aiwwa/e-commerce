<template>
  <div>E-Shop</div>
  <div v-for="(product, index) in productsUI" :key="index" class="wrapper">
    <div>{{ product.title }}</div>
    <div>{{ product.price }}</div>
    <div>{{ product.createdBy }}</div>
    <button
      v-if="
        state.currentUser.name !== product.createdBy &&
        state.currentUser.logedIn
      "
    >
      Add to cart
    </button>
    <button
      v-if="
        state.currentUser.name !== product.createdBy &&
        state.currentUser.logedIn
      "
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
  setup() {
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

    //Hooks
    onMounted(() => {
      products.value = state.users.map((user) => user._value.products)
      setProducts()
    })

    return { products, productsUI, state }
  },
}
</script>

<style>
.wrapper {
  margin: 20px;
}
</style>
