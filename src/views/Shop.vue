<template>
  <div class="product-container">
    <div v-for="(product, index) in productsUI" :key="index" class="wrapper">
      <div>{{ product.title }}</div>
      <div>{{ product.price }}</div>
      <div>User: {{ product.createdBy }}</div>
      <div class="more-info">
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
          <router-link
            :to="{ name: 'SingleProduct', params: { id: product.id } }"
          >
            More
          </router-link>
        </div>
      </div>
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
.product-container {
  width: 100vw;
  height: 100vh;
  background-color: rgb(224, 223, 229);
  padding-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 300px 300px 300px 300px;
}

.wrapper {
}

.wrapper:hover .more-info {
  display: block;
}

.more-info {
  display: none;
}
</style>
