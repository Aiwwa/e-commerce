<template>
  <div class="single-prd-wrapp">
    <div class="images">
      <div v-for="(img, index) in singleProduct.img" :key="index">
        <img :src="img" alt="" />
      </div>
    </div>
    <div class="prod-info">
      <h2>{{ singleProduct.title }}</h2>
      <div class="description">{{ singleProduct.description }}</div>
      <div class="price">Product price: {{ singleProduct.price }} €</div>
      <button @click="handleRemoveSingleProduct">remove</button>
    </div>
  </div>
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

<style scoped>
.single-prd-wrapp {
  display: flex;
}

.single-prd-wrapp .images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr 1fr;
  gap: 10px;
}

.single-prd-wrapp .prod-info {
  width: 100%;
  margin-left: 40px;
  text-align: start;
  overflow: auto;
}
.single-prd-wrapp .prod-info h2 {
  margin-bottom: 40px;
}
.single-prd-wrapp .prod-info .description {
  height: 100px;
  padding: 10px;
  background-color: rgb(205, 203, 213);
  word-wrap: break-word;
  overflow: auto;
  margin-bottom: 10px;
}

.single-prd-wrapp .prod-info .price {
  margin-bottom: 60px;
}

button {
  margin: 0;
  padding: 5px 10px;
  font-size: 14px;
}

img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
</style>
