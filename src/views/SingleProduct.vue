<template>
  <div class="products-added-wrapp">
    <button @click="goBack">Go back</button>

    <div class="single-prd-wrapp">
      <div class="images">
        <div v-for="(img, index) in produtc.img" :key="index">
          <img :src="img" alt="" />
        </div>
      </div>
      <div class="prod-info">
        <h2>{{ produtc.title }}</h2>
        <div class="description">{{ produtc.description }}</div>
        <div class="price">Product price: {{ produtc.price }} €</div>
      </div>
    </div>
  </div>
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

<style scoped>
.products-added-wrapp {
  min-width: 100%;
  height: 100vh;
  background-color: rgb(224, 223, 229);
  padding: 10px;
}
.single-prd-wrapp {
  display: flex;
}

.single-prd-wrapp .images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr 1fr;
  gap: 10px;
}

.single-prd-wrapp .prod-info {
  width: 100%;
  margin-left: 40px;
  text-align: start;
  overflow: auto;
}
.single-prd-wrapp .prod-info h2 {
  margin-bottom: 40px;
}
.single-prd-wrapp .prod-info .description {
  height: 100px;
  padding: 10px;
  background-color: rgb(205, 203, 213);
  word-wrap: break-word;
  overflow: auto;
  margin-bottom: 10px;
}

.single-prd-wrapp .prod-info .price {
  margin-bottom: 60px;
}

button {
  margin: 0;
  padding: 5px 10px;
  font-size: 14px;
}

img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background: white;
  cursor: pointer;
}

button:hover {
  background: rgba(167, 167, 167, 0.466);
}
</style>
