<template>
  <form @submit.prevent="handleSubmit">
    <input type="textl" placeholder="user name" v-model="userName" />
    <input type="password" placeholder="password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  // setup(props, context)
  setup() {
    const { state } = useStore()

    const userName = ref('')
    const password = ref('')
    const router = useRouter()

    const handleSubmit = () => {
      state.user.name = ''
      state.user.name = userName
      state.user.logedIn = true

      router.push('/User')
    }

    return { userName, password, handleSubmit }
  },
}
</script>

<style></style>
