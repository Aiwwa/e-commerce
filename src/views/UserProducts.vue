<template>
  <div>Products</div>
  <div>
    <h2>product list</h2>
  </div>
  <div class="products-file-upload">
    <form @submit.prevent="handleAddProduct">
      <label for="product name">Product name</label>
      <input type="text" v-model="title" />
      <label for="product description">product description</label>
      <textarea v-model="description"></textarea>
      <label for="price">Price</label>
      <input type="number" v-model="price" />
      <div class="products-image-upload">
        <label for="image">image url address</label>
        <input type="text" v-model="img1" />
        <input type="text" v-model="img2" />
        <input type="text" v-model="img3" />
        <input type="text" v-model="img4" />
      </div>
      <button>Add product</button>
    </form>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  setup() {
    const store = useStore()
    const { state } = useStore()

    const userSingleProduct = {
      title: '',
      description: '',
      price: '',
      img: [],
    }

    //user product inputs
    const title = ref('')
    const description = ref('')
    const price = ref('')
    const img1 = ref('')
    const img2 = ref('')
    const img3 = ref('')
    const img4 = ref('')

    // Functions

    const handleAddProduct = () => {
      userSingleProduct.title = title.value
      userSingleProduct.description = description.value
      userSingleProduct.price = price.value
      userSingleProduct.img.push(img1.value, img2.value, img3.value, img4.value)

      addSingleProduct()

      userSingleProduct.img = []

      description.value = ''
      title.value = ''
      price.value = ''
      img1.value = ''
      img2.value = ''
      img3.value = ''
      img4.value = ''
    }

    const addSingleProduct = () =>
      store.commit('addSingleProduct', userSingleProduct)

    //Hooks
    onMounted(() => {
      //
    })

    return {
      userSingleProduct,
      title,
      description,
      price,
      img1,
      img2,
      img3,
      img4,
      handleAddProduct,
      addSingleProduct,
    }
  },
}
</script>

<style></style>
