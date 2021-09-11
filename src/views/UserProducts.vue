<template>
  <div>
    <div v-for="(product, index) in userProducts" :key="index">
      <SingleUserProduct :product="product" @updateSingleProduct="update" />
    </div>
  </div>
  <br />
  <br />
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
import SingleUserProduct from '../components/SingleUserProduct.vue'

export default {
  components: { SingleUserProduct },
  setup() {
    const store = useStore()
    const { state } = useStore()

    const userProducts = ref([])
    const userSingleProduct = {
      title: '',
      description: '',
      price: '',
      sum: '',
      count: '',
      img: [],
      id: '',
      isFav: false,
      createdBy: state.currentUser.name,
    }

    //user product inputs
    const title = ref('')
    const description = ref('')
    const price = ref('')
    const img1 = ref('')
    const img2 = ref('')
    const img3 = ref('')
    const img4 = ref('')

    //Emits
    const update = (filtered) => {
      userProducts.value = filtered
    }
    // Functions
    const handleAddProduct = () => {
      userSingleProduct.title = title.value
      userSingleProduct.description = description.value
      userSingleProduct.price = price.value
      userSingleProduct.id = title.value
      userSingleProduct.img.push(img1.value, img2.value, img3.value, img4.value)

      addSingleProduct()
      userProducts.value = state.currentUser.products
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
      userProducts.value = state.currentUser.products
    })

    return {
      userProducts,
      userSingleProduct,
      title,
      description,
      price,
      img1,
      img2,
      img3,
      img4,
      update,
      handleAddProduct,
      addSingleProduct,
    }
  },
}
</script>

<style></style>
