<template>
  <div>Single Prod</div>
  <div>{{ produtc }}</div>
</template>

<script>
import { onMounted, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  props: ['id'],
  setup(props) {
    const store = useStore()
    const { state } = useStore()

    const produtc = ref({})
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

    return { produtc }
  },
}
</script>

<style></style>
