<template>
  <div>Loged in as {{ userName }}</div>
  <button @click="logOutUser">log out</button>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeUnmount, watch } from '@vue/runtime-core'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const userName = store.state.currentUser.name

    const logOutUser = () => {
      router.push({ name: 'Home' })
      store.commit('logOut')
    }

    return {
      userName,
      logOutUser,
    }
  },
}
</script>

<style></style>
