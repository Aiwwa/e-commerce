<template>
  <div class="login-wrapper">
    <div class="general">
      <div>Contact</div>
      <div>_</div>
    </div>
    <div class="border"></div>
    <div v-if="showLogin" class="login-form">
      <LoginForm @login="enterProfile" />
      <p class="login-question">
        No account yet?
        <span @click="showLogin = false">Signup</span>
      </p>
    </div>
    <div v-else class="login-form">
      <h2>Sign Up</h2>
      <SignupForm @signup="enterChat" />
      <p class="login-question">
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

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background-color: rgb(224, 223, 229);
}

.border {
  height: 100vh;
  width: 1px;
  border-left: 1px solid rgb(192, 192, 192);
}

.general {
  width: 1000%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.general div {
  font-size: 60px;
  font-weight: 900;
  margin-top: 300px;
}

.login-form {
  margin: 200px;
}

.login-question span {
  margin: 0 25px;
  color: rgb(122, 91, 24);
}

button {
  width: 100%;
}

.danger {
  color: red;
}
</style>
