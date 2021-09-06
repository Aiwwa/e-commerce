<template>
  <div class="welcome container">
    <div v-if="showLogin">
      <h2>Log In</h2>
      <LoginForm @login="enterProfile" />
      <p>
        No account yet?
        <span @click="showLogin = false">Signup</span>
      </p>
    </div>
    <div v-else>
      <h2>Sign Up</h2>
      <SignupForm @signup="enterChat" />
      <p>
        Already have an account?
        <span @click="showLogin = true">Login</span>
      </p>
    </div>
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue'
import LoginForm from '../components/LoginForm.vue'
import store from '@/store'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
  components: { SignupForm, LoginForm },
  setup() {
    const showLogin = ref(true)
    const router = useRouter()

    const enterChat = () => {
      store.state.currentUser.name = displayName
      router.push('/user')
    }

    return { showLogin, enterChat }
  },
}
</script>

<style></style>
