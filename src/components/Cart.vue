<template lang="pug">
  .product
    .product__container
      input.product__input(placeholder='Название' type="text" v-model="product.name" @input="onChangeProductField('name')")
      .product__error(v-if="!isValidProduct.name") Вы не указали название

      input.product__input(placeholder='Количество' type="number" v-model="product.quantity" @input="onChangeProductField('quantity')")
      .product__error(v-if="!isValidProduct.quantity") Вы не указали количество

      select.product__select(v-model="product.currency" @select="onChangeProductField('Валюта')")
        option(disabled value="">Выберите один из вариантов)
        option RUB
        option EUR
        option USD
      .product__error(v-if="!isValidProduct.currency") Вы не указали валюту

      input.product__input(placeholder='Цена' type="number" v-model="product.price" @input="onChangeProductField('price')")
      .product__error(v-if="!isValidProduct.price") Вы не указали цену

      button.product__btn(v-if="isValidProductAll" @click="onClickToAddProduct") Добавить
    .product__count
      p Вы добавили {{productsCount}} товаров
      p {{productPricesString}}
      
      button.product__btn(v-if="productsCount" @click="onClickToClear") Очистить коризину
      button.product__btn(v-if="productsCount" @click="onClickToCountPrices") Посчитать

</template>

<script>

export default {
  name: "Cart",

  data: () => ({
    isValidProduct: {
      name: true,
      quantity: true,
      currency: true,
      price: true
    },

    products: [],
    product: {
      name: "",
      quantity: "",
      currency: "",
      price: ""
    },
    productPrices: { EUR: "", USD: "", RUB: "" }
  }),

  mounted() {
    this.loadProducts();
  },

  computed: {
    isValidProductAll() {
      return Object.keys(this.product).every(key =>
        this.isValidProductField(key)
      );
    },

    productsCount() {
      return this.products.reduce(
        (count, product) =>
          product.quantity ? count + Number(product.quantity) : 1,
        0
      );
    },
    isEmptyProductPrice() {
      const { EUR, RUB, USD } = this.productPrices;
      return [EUR, RUB, USD].every(item => item === '');
    },

    productPricesString() {
      const { EUR, RUB, USD } = this.productPrices;
      return this.isEmptyProductPrice ? '' :`EUR:${EUR} RUB:${RUB} USD:${USD}`;
    }
  },

  methods: {
    onChangeProductField(field) {
      this.isValidProduct[field] = this.isValidProductField(field);
    },

    async onClickToCountPrices() {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(this.products),
      });
      const { data } = await response.json();
      this.productPrices = { ...this.productPrices, ...data };
    },

    onClickToAddProduct() {
      this.$store.commit("addProduct", this.product);
      this.resetProductForm();
    },

    onClickToClear() {
      this.$store.commit("removeAllProducts");
      this.loadProducts();
    },

    isValidProductField(key) {
      const field = this.product[key];
      return isNaN(Number(field)) ? field !== "" : Number(field) > 0;
    },

    loadProducts() {
      this.products = this.$store.getters.products;
    },

    resetProductForm() {
      this.product = {
        name: "",
        quantity: "",
        currency: "",
        price: ""
      };
    }
  }
};
</script>

<style scoped>
.product {
  max-width: 860px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
.product__container {
  display: flex;
  flex-direction: column;
  width: calc(50% - 30px);
  padding: 0 15px;
}
.product__count {
  padding: 0 15px;
  width: calc(50% - 30px);
  display: flex;
  flex-direction: column;
  text-align: left;
}
.product__count p {
  padding: 0;
  margin: 0;
  margin-bottom: 5px;
  font-size: 24px;
}
.product__btn {
  background-color: darkgreen;
  color: white;
  margin-bottom: 10px;
  padding: 10px;
}
.product__input,
.product__select,
.product__btn,
.product__error {
  margin-bottom: 10px;
  padding: 10px;
  text-align: left;
}

.product__error {
  color: red;
}
</style>
