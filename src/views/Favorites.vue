<template>
  <div class="favorite-wrapper">
    <div v-for="(favorit, index) in favorites" :key="index" class="favorite">
      <div>
        <h4>{{ favorit.title }}</h4>
        <img :src="favorit.img[0]" alt="" />
      </div>
      <div class="fav-info">
        <button @click="handleAddToCart(favorit)">
          Add to cart
        </button>
        <button @click="handelRemoveFromfavorites(favorit)">
          Remove from favorites
        </button>
        <router-link
          :to="{ name: 'SingleProduct', params: { id: favorit.id } }"
        >
          More
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  props: ['id'],
  setup() {
    const store = useStore()
    const { state } = useStore()

    const favorites = ref([])

    //Functions
    const handelRemoveFromfavorites = (favorit) => {
      const filtered = store.state.currentUser.favorites.filter((product) => {
        return product.title !== favorit.title
      })

      store.commit('removeProductFromFavorites', filtered)
      favorites.value = filtered
    }

    const handleAddToCart = (product) => {
      store.commit('handleAddToCart', product)
    }
    //Hooks
    onMounted(() => {
      favorites.value = state.currentUser.favorites
    })

    return { favorites, handelRemoveFromfavorites, handleAddToCart }
  },
}
</script>

<style scoped>
.favorite-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgb(224, 223, 229);
  padding-top: 50px;
}

.favorite {
  display: flex;
}

.fav-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  margin-left: 30px;
}

img {
  width: 300px;
  height: 200px;
}

a {
  margin: 10px;
  padding: 10px 30px;
  border: 1px solid black;
  width: 100%;
  background: white;
  border: none;
  text-decoration: none;
  color: black;
  font-weight: 500;
}

button {
  width: 100%;
  margin: 10px;
}
button:hover {
  background: rgba(167, 167, 167, 0.466);
}
a:hover {
  background: rgba(167, 167, 167, 0.466);
}
</style>
