<template>
  <div class="user">
    <div class="user-info">
      <div>Loged in as: {{ userName }}</div>
      <button @click="logOutUser" class="log-out">log out</button>
    </div>
  </div>
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

<style>
.user {
  width: 100vw;
  height: 100vh;
  background-color: rgb(224, 223, 229);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.user-info {
  margin-top: 40px;
  display: flex;
  align-items: center;
}
button {
  cursor: pointer;
  margin: 10px;
  padding: 10px 30px;
  border: 1px solid black;
  /* width: 100%; */
}

button:hover {
  background: rgba(167, 167, 167, 0.466);
}
</style>
