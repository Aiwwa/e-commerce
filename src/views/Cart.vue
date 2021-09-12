<template>
  <div class="cart-wrapper">
    <div v-for="(product, index) in cart" :key="index" class="cart-single">
      <UserCart
        :product="product"
        @removeProductFromCart="removeProductFromCart"
      />
    </div>
    <div>Total: {{ state.currentUser.totalSum }} €</div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from 'vue'
import UserCart from '../components/UserCart.vue'
export default {
  components: { UserCart },
  setup() {
    const store = useStore()
    const { state } = useStore()

    const cart = ref([])

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

<style>
.cart-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgb(224, 223, 229);
  padding-top: 50px;
}

.cart-single {
  display: flex;
  margin: 10px;
}
</style>
