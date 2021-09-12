<template>
  <form @submit.prevent="handleLogin" class="form">
    <input type="user name" placeholder="user name" v-model="userName" />
    <input type="password" placeholder="password" v-model="password" />
    <div v-if="userExist" class="danger">User doesn't exist</div>
    <div v-if="logInFail" class="danger">Username or password is wrong</div>
    <div class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const userName = ref('')
    const password = ref('')

    //Auth
    const logInFail = ref(false)
    const userExist = ref(false)
    const logInData = ref({ userName: '', password: '' })
    const currentUserFromLogIn = ref({})
    const userLogin = ref(false)

    //Functions
    const getLoginData = () => {
      logInData.value.userName = userName.value
      logInData.value.password = password.value
    }

    const chechUserData = () => {
      if (store.state.users.length <= 0) {
        userExist.value = true
      } else {
        userExist.value = false

        store.state.users.find((user) => {
          if (
            user._value.name === userName.value &&
            user._value.password === password.value
          ) {
            logInFail.value = false
            userLogin.value = true
            return (currentUserFromLogIn.value = {
              ...user._value,
              logedIn: true,
            })
          } else {
            logInFail.value = true
          }
        })
      }
    }

    const handleLogin = () => {
      getLoginData()
      chechUserData()

      if (userLogin.value) {
        store.commit('logIn', currentUserFromLogIn)
        router.push('/user')
      }
    }

    return {
      userName,
      password,
      logInData,
      logInFail,
      userExist,
      currentUserFromLogIn,
      handleLogin,
    }
  },
}
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  /* padding: 50px 200px; */
}

input {
  display: inline-block;
  margin: 20px 0;
  font-size: 18px;
  outline: none;
  border: none;
  padding: 20px 60px 10px 10px;
}

button {
  margin: 20px 0;
  font-size: 18px;
  padding: 15px;
  outline: none;
  border: none;
  background-color: white;
  display: flex;
  justify-content: center;
}
</style>
