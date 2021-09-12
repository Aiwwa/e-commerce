<template>
  <div><img :src="singleProduct.img" alt="" /></div>
  <div class="cart-info">
    <div>
      <div>Product: {{ singleProduct.title }}</div>
      <div>Price: {{ singleProduct.price }} €</div>
      <div>Sum: {{ singleProduct.sum }} €</div>
    </div>
    <div class="counter">
      <button @click="minusCart(product)">-</button>
      <button>{{ singleProduct.count }}</button>
      <button @click="plusCart(product)">+</button>
    </div>
    <div class="remove">
      <button @click="handleRemoveSingleProduct(), handlePriceUpdate(product)">
        Remove
      </button>
    </div>
  </div>
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
    //When removing whole product from cart
    const handlePriceUpdate = (product) => {
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

<style scoped>
img {
  width: 400px;
  height: 400px;
  object-fit: cover;
}

.counter {
  display: flex;
}

.cart-info {
  margin-top: 20px;
  margin-left: 400px;
  width: 600px;
}

button {
  width: 100%;
  border: 1px solid rgb(224, 224, 224);
}

.remove {
  display: flex;
}
</style>
