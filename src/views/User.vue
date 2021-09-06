<template>
  <button @click="logOutUser">log out</button>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeUnmount, watch } from '@vue/runtime-core'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const { state } = useStore()
    const router = useRouter()

    const logOutUser = () => {
      router.push({ name: 'Home' })
      store.commit('logOut')
    }

    return {
      logOutUser,
    }
  },
}
</script>

<style></style>
