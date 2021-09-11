<template>
  <div>{{ singleProduct }}</div>
  <button @click="handleRemoveSingleProduct">Remove</button>
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
        store.commit('minusPriceOnRemove', product)

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

    //Hooks
    onMounted(() => (singleProduct.value = props.product))

    return { singleProduct, handleRemoveSingleProduct, plusCart, minusCart }
  },
}
</script>

<style></style>
