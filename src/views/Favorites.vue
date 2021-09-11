<template>
  <div>Fav</div>
  <div v-for="(favorit, index) in favorites" :key="index">
    {{ favorit.title }}
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

    //Hooks
    onMounted(() => {
      favorites.value = state.currentUser.favorites
      console.log(favorites.value)
    })

    onUpdated(() => {
      favorites.value = state.currentUser.favorites
    })

    return { favorites }
  },
}
</script>

<style></style>
