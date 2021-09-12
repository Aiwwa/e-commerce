<template>
  <div class="home">
    <img
      src="https://cdn.shopify.com/s/files/1/0050/7065/1466/files/TAW05549_2100x.jpg?v=1553002863"
      alt=""
    />
  </div>
  <router-link to="/shop" class="shop-link"><span>Shop Now</span></router-link>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
}
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img:hover {
  background-color: black;
}

.shop-link {
  position: absolute;
  top: 900px;
  left: 50px;
  color: black;
  text-decoration: none;
  padding: 20px 40px;
  background-color: white;
  font-weight: 600;
}
</style>
