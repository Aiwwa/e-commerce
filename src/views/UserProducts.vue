<template>
  <div class="main-products-wrapper">
    <div class="products-added-wrapp">
      <div
        v-for="(product, index) in userProducts"
        :key="index"
        class="products-added"
      >
        <SingleUserProduct :product="product" @updateSingleProduct="update" />
      </div>
    </div>
    <div class="products-file-upload">
      <form @submit.prevent="handleAddProduct" class="add-products">
        <label for="product name">Product name</label>
        <input type="text" v-model="title" />
        <label for="product description">Product description</label>
        <textarea v-model="description"></textarea>
        <label for="price">Price</label>
        <input type="number" v-model="price" />
        <div class="products-image-upload">
          <label for="image">Image url address</label>
          <input type="text" v-model="img1" />
          <input type="text" v-model="img2" />
          <input type="text" v-model="img3" />
          <input type="text" v-model="img4" />
        </div>
        <button>Add product</button>
      </form>
    </div>
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

<style scoped>
.main-products-wrapper {
  display: flex;
  justify-content: space-between;
  background-color: rgb(224, 223, 229);
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
.products-added-wrapp {
  margin-top: 45px;
  min-width: 1000px;
  width: 1400px;
}
.products-added {
  border-top: 1px solid black;
  padding: 10px;
}

.add-products {
  display: flex;
}

.products-file-upload form {
  display: flex;
  flex-direction: column;
  margin: 0 200px;
}

.products-file-upload form label {
  display: inline-block;
  margin: 20px 0;
  font-size: 18px;
  outline: none;
  border: none;
  padding: 20px 60px 10px 10px;
}

.products-file-upload form input {
  border: none;
  border-bottom: 1px solid black;
  background-color: rgb(205, 203, 213);
  font-size: 18px;
  margin: 20px;
}
.products-file-upload form textarea {
  border: none;
  border-bottom: 1px solid black;
  background-color: rgb(205, 203, 213);
  font-size: 18px;
  padding: 20px 60px 0px 10px;
  margin: 0 20px;
}

.products-image-upload {
  display: flex;
  flex-direction: column;
}

button {
  margin: 0 20px;
}
</style>
