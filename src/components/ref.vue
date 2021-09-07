<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="name" v-model="displayName" />
    <div v-if="nameExists">Name Exists</div>
    <div v-if="nameMin">Name must be 3</div>
    <div v-if="nameMax">Name max 30</div>
    <input required type="password" placeholder="password" v-model="password" />
    <input
      required
      type="password"
      placeholder="confirm password"
      v-model="passwordConfirm"
    />
    <div v-if="passwordMatch">Password doesnt match</div>
    <button>Sign up</button>
  </form>
</template>

<script>
import { onMounted, onUpdated, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup(props, context) {
    const store = useStore()
    const displayName = ref('')
    const password = ref('')
    const passwordConfirm = ref('')
    const nameExists = ref(false)
    const newUser = reactive({
      name: null,
      password: null,
      passwordConfirm: null,
      logedIn: false,
      products: [],
      favorites: [],
      cart: [],
      id: null,
    })
    const router = useRouter()
    //Auth
    const nameMin = ref(false)
    const nameMax = ref(false)
    const passwordMatch = ref(false)
    //Functions
    const chechIfUserExist = (userName) => {
      store.state.users.forEach((el) => {
        if (userName.value === el.name) {
          return (nameExists.value = false)
        } else {
          return (nameExists.value = true)
        }
      })
    }

    const createUser = () => {
      if (displayName.value.length < 3) {
        nameMin.value = true
        nameMax.value = false
      }
      if (displayName.value.length > 30) {
        nameMin.value = false
        nameMax.value = true
      }

      if (password.value === passwordConfirm.value) {
        passwordMatch.value = false
      } else {
        passwordMatch.value = true
      }

      if (
        displayName.value.length > 3 &&
        displayName.value.length < 30 &&
        password.value
      ) {
        nameMin.value = false
        nameMax.value = false
        newUser.name = displayName
        newUser.logedIn = true
        newUser.password = password
        newUser.passwordMatch = passwordConfirm
        newUser.id = passwordConfirm

        chechIfUserExist(displayName)

        if (nameExists.value) {
          nameExists.value = false

          const createCurrentUserInStore = () =>
            store.commit('createUser', newUser)
          createCurrentUserInStore()

          router.push('/user')
        } else {
          nameExists.value = true
          console.log('galvok kita')
        }
      }
    }
    const handleSubmit = () => {
      createUser()
    }
    return {
      newUser,
      nameExists,
      displayName,
      password,
      passwordConfirm,
      passwordMatch,
      nameMin,
      nameMax,
      createUser,
      handleSubmit,
    }
  },
}
</script>

<style></style>
