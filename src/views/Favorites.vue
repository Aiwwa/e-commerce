<template>
  <div>Fav</div>
  <div v-for="(favorit, index) in favorites" :key="index">
    {{ favorit.title }}
    <button @click="handelRemoveFromfavorites(favorit)">
      Remove from fvorites
    </button>
  </div>
</template>

<script>
import { onMounted, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
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
    //Hooks
    onMounted(() => {
      favorites.value = state.currentUser.favorites
      console.log(favorites.value)
    })

    return { favorites, handelRemoveFromfavorites }
  },
}
</script>

<style></style>
