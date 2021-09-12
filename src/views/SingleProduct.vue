<template>
  <div>Single Prod</div>
  <button @click="goBack">Go back</button>
  <div>{{ produtc }}</div>
</template>

<script>
import { onMounted, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  props: ['id'],
  setup(props) {
    const store = useStore()
    const { state } = useStore()
    const router = useRouter()

    const produtc = ref({})

    const goBack = () => {
      router.go(-1)
    }

    //Hooks
    onMounted(() => {
      state.users.forEach((el) => {
        console.log(el._value.products)
        el._value.products.forEach((el) => {
          if (el.id === props.id) {
            produtc.value = el
          }
        })
      })
    })

    return { produtc, goBack }
  },
}
</script>

<style></style>
