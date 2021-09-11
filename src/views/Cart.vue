<template>
  <div>Cart</div>
  <div v-for="(product, index) in cart" :key="index">
    <UserCart
      :product="product"
      @removeProductFromCart="removeProductFromCart"
    />
  </div>
  <div>Total: {{ state.currentUser.totalSum }}</div>
</template>

<script>
import { onMounted, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from 'vue'
import UserCart from '../components/UserCart.vue'
export default {
  components: { UserCart },
  setup() {
    const store = useStore()
    const { state } = useStore()

    const cart = ref([])
    //Functions

    //Emits
    const removeProductFromCart = (filtered) => {
      cart.value = filtered
    }
    //Hooks
    onMounted(() => {
      cart.value = state.currentUser.cart
    })
    return { cart, state, removeProductFromCart }
  },
}
</script>

<style></style>
