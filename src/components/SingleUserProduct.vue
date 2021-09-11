<template>
  <div>{{ singleProduct }}</div>
  <button @click="handleRemoveSingleProduct">remove</button>
</template>

<script>
import { onMounted, onUpdated } from '@vue/runtime-core'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  props: ['product'],
  emits: ['updateSingleProduct'],
  setup(props, { emit }) {
    const store = useStore()
    const singleProduct = ref({})

    //Functions
    const handleRemoveSingleProduct = () => {
      const filtered = store.state.currentUser.products.filter((product) => {
        return product.id !== props.product.id
      })

      store.commit('removeSingleProduct', filtered)
      emit('updateSingleProduct', filtered)
    }

    //Hooks
    onMounted(() => (singleProduct.value = props.product))

    return { singleProduct, handleRemoveSingleProduct }
  },
}
</script>

<style></style>
