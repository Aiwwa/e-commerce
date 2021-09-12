<template>
  <div class="product-container">
    <div v-for="(product, index) in productsUI" :key="index" class="wrapper">
      <div>
        <img :src="product.img[0]" alt="" />
      </div>
      <div class="more-info">
        <div class="more-info-sub">
          <div>Name: {{ product.title }}</div>
          <div>Product price {{ product.price }} €</div>
          <div>Added by: {{ product.createdBy }}</div>
        </div>
        <div class="more-info-btn">
          <div class="sub-btn">
            <button
              v-if="
                state.currentUser.name !== product.createdBy &&
                state.currentUser.logedIn
              "
              @click="handleAddToCart(product)"
            >
              Add to cart
            </button>
            <button
              v-if="
                state.currentUser.name !== product.createdBy &&
                state.currentUser.logedIn &&
                !product.isFav
              "
              @click="handleAddToFavorites(product)"
            >
              Add to favorites
            </button>
          </div>
          <div v-if="state.currentUser.logedIn" class="more">
            <router-link
              :to="{ name: 'SingleProduct', params: { id: product.id } }"
            >
              More
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  setup(props) {
    const store = useStore()
    const { state } = useStore()

    const products = ref([])
    const productsUI = ref([])

    //Functions
    const setProducts = () => {
      products.value.forEach((el) => {
        el.forEach((product) => {
          productsUI.value.push(product)
        })
      })
    }

    const handleAddToFavorites = (product) => {
      store.commit('addToFavorites', product)
    }

    const handleAddToCart = (product) => {
      store.commit('handleAddToCart', product)
    }

    //Hooks
    onMounted(() => {
      products.value = state.users.map((user) => user._value.products)
      setProducts()
    })

    return {
      products,
      productsUI,
      state,
      handleAddToFavorites,
      handleAddToCart,
    }
  },
}
</script>

<style scoped>
.product-container {
  width: 100vw;
  height: 100vh;
  background-color: rgb(224, 223, 229);
  padding-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  overflow: hidden;
}

.wrapper {
  display: flex;
  flex-direction: column;
  border: 1px dotted rgb(211, 211, 211);
}

.wrapper img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
.wrapper .more-info {
  display: flex;
  flex-direction: column;
}

.wrapper .more-info .more-info-sub {
  display: flex;
}
.wrapper .more-info .more-info-sub div {
  margin: 0 10px;
  color: rgb(122, 91, 24);
}

.more {
  padding: 5px 10px;
  border: 1px solid black;
  margin: 10px;
  background: white;
}
.more:hover {
  background: rgba(167, 167, 167, 0.466);
}
.more a {
  text-decoration: none;
  color: black;
}
button {
  margin: 10px;
  padding: 10px 30px;
  border: 1px solid black;
  width: 100%;
}

button:hover {
  background: rgba(167, 167, 167, 0.466);
}

.sub-btn {
  display: flex;
  justify-content: center;
}
</style>
