<template>
  <div>{{ singleProduct }}</div>
  <button @click="handleRemoveSingleProduct(), handlePriceUpdate(product)">
    Remove
  </button>
  <button @click="plusCart(product)">+</button>
  <button @click="minusCart(product)">-</button>
</template>

<script>
import { onMounted, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  props: ['product'],
  emits: ['removeProductFromCart'],
  setup(props, { emit }) {
    const store = useStore()
    const singleProduct = ref({})

    //Functions
    const handleRemoveSingleProduct = () => {
      const filtered = store.state.currentUser.cart.filter((product) => {
        return product.title !== props.product.title
      })

      store.commit('removeProductFromCart', filtered)
      emit('removeProductFromCart', filtered)
    }

    const plusCart = (product) => {
      store.commit('plusCartPrice', product)
    }
    const minusCart = (product) => {
      store.commit('minusCartPrice', product)
    }
    //When removing product from cart
    const handlePriceUpdate = (product) => {
      console.log(product)
      store.commit('minusPriceOnRemove', product)
    }

    //Hooks
    onMounted(() => (singleProduct.value = props.product))

    return {
      singleProduct,
      handleRemoveSingleProduct,
      plusCart,
      minusCart,
      handlePriceUpdate,
    }
  },
}
</script>

<style></style>
