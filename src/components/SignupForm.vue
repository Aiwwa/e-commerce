<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="name" v-model="displayName" />
    <div v-if="userExists">Name Exists</div>
    <div v-if="nameMin">Name must be 3</div>
    <div v-if="nameMax">Name max 30</div>
    <input required type="password" placeholder="password" v-model="password" />
    <input
      required
      type="password"
      placeholder="confirm password"
      v-model="passwordConfirm"
    />
    <div v-if="!passwordMatch">Password doesnt match</div>
    <button>Sign up</button>
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

    const displayName = ref('')
    const password = ref('')
    const passwordConfirm = ref('')
    const newUser = ref({
      name: null,
      password: null,
      passwordConfirm: null,
      logedIn: false,
      products: [],
      favorites: [],
      cart: [],
      id: null,
      totalSum: 0,
    })
    //Auth
    const nameMin = ref(false)
    const nameMax = ref(false)
    const passwordMatch = ref(false)
    const userExists = ref(false)

    //Functions
    const validatePassword = () => {
      if (password.value === passwordConfirm.value) {
        passwordMatch.value = true
      } else {
        passwordMatch.value = false
      }
    }

    const validateName = () => {
      if (displayName.value.length < 3) {
        nameMin.value = true
        nameMax.value = false
      }
      if (displayName.value.length > 30) {
        nameMin.value = false
        nameMax.value = true
      }

      if (displayName.value.length > 3 && displayName.value.length < 30) {
        nameMin.value = false
        nameMax.value = false
      }
    }

    const validateUserExists = (displayName) => {
      store.state.users.find((user) => {
        if (user._value.name === displayName.value) {
          return (userExists.value = true)
        } else {
          return (userExists.value = false)
        }
      })
    }

    const createUser = () => {
      newUser.value.name = displayName.value
      newUser.value.password = password.value
      newUser.value.passwordConfirm = passwordConfirm.value
      newUser.value.logedIn = true
    }

    const createCurrentUserInStore = () => store.commit('createUser', newUser)

    const handleSubmit = () => {
      validatePassword()
      validateName()
      validateUserExists(displayName)

      if (
        !nameMin.value &&
        !nameMax.value &&
        passwordMatch.value &&
        !userExists.value
      ) {
        createUser()
        createCurrentUserInStore()

        router.push('/user')
      }
    }
    return {
      newUser,
      userExists,
      displayName,
      password,
      passwordConfirm,
      passwordMatch,
      nameMin,
      nameMax,
      handleSubmit,
    }
  },
}
</script>

<style></style>
