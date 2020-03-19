<template lang="pug">
  div.product
    input.product__input(placeholder='name' type="text" v-model="product.name")
    input.product__input(placeholder='quantity' type="number" v-model="product.quantity")
    select.product__select(v-model="product.currency")
      option(disabled value="">Выберите один из вариантов)
      option RUB
      option EUR
      option USD
    input.product__input(placeholder='price' type="number" v-model="product.price")
    br
    button.product__btn(@click="onClickToAddCart") Добавить
</template>

<script>
export default {
  name: "Cart",
  data: () => ({
    product: {
      name: "",
      quantity: "",
      currency: "",
      price: ""
    }
  }),
  methods: {
    onClickToAddCart() {
      if (this.product.name !== "") {
        this.$store.commit("add", this.product);
        this.name = "";
        (this.quantity = ""), (this.currency = ""), (this.price = "");
      } else {
        console.log("Вы не данные");
      }
    }
  }
};
</script>

<style scoped>
.product {
  font-size: 36px;
  height: 36px;
  width: 500px;
  display: flex;
  flex-direction: column;
}
.product__btn {
  background-color: darkgreen;
  color: white;
  margin-bottom: 10px;
  padding: 10px;
}
.product__input,
.product__select,
.product__btn {
  margin-bottom: 10px;
  padding: 10px;
}
</style>
