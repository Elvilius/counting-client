<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Cart/>
  </div>
</template>

<script>
import Cart from './components/Cart.vue'

export default {
  name: 'App',
  components: {
    Cart,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
