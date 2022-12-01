<script setup lang="ts">
  import { addProductToCart } from "@/stores/cart";
  import { RouterLink } from 'vue-router';
  import { computed, watch, reactive, ref } from "vue";
  import { isLoading } from "@/stores/session";
  import { getProducts, type Product } from "../stores/product";

  //initially getting a promise, using ref will update it when that promise is fullfiled
  const products = reactive([] as Product[]);
  getProducts().then( x => products.push(...x.products));

  const search = ref("");

  function addToCart(product: Product) {
    addProductToCart(product);
  }

  // Another way to handle this - imperative programming instead of functional programming //
  //results can also be a reactive array with const results = reactive(products);
  //convert json to typescript easy online -> put in stores/product.ts and include a productdocument and product inferface export (see professor's code)
  //import type Product
  //results can then be found with similar code as before but in searchProducts function
  //call function in routerlink

  //OR use watch!
  //watch(search, searchProducts); firsrt param reactive, second is function to call when watch sees a change

  //OR:
  //Add v-show="product.title..... etc. search case" to routerlink

</script>

<template>

  <div>

    <div class="control">
      <input class="input" type="text" v-model="search" placeholder="Search"/>
    </div>

    <div class="products">
      <RouterLink class="product" :class="{ 'is-disabled': isLoading }" v-for="product in products" :key="product.id" :to="`/product/${product.id}`" v-show="product.title.toLowerCase().includes(search.toLowerCase())">

        <button class="button is-primary add" :class="{ 'is-loading': isLoading }" @click.prevent="addToCart(product)">+</button>

        <div class="product-image">
          <img :src="product.thumbnail" alt="product image"/>
        </div>
        <div class="product-info">
          <h3 class="title is-4">{{ product.title }}</h3>
          <p>{{ product.description }}</p>
          <p class="price subtitle">
            <span class="curency">
              $
            </span>
            <span class="amount">
              {{ product.price }}
            </span>
          </p>
        </div>
      </RouterLink>
    </div>

  </div>

</template>

<style scoped>
  .is-disabled {
    pointer-events: none;
    opacity: 0.7;
  }
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: rgb(240, 255, 254);
  }
  .product {
    flex-basis: 18em;
    margin: 1em;
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 1em;
    background-color: white;
    position: relative;
    transition: 0.2s;
  }
  .product:hover {
    background-color: rgb(248, 248, 248);
  }
  .product-info {
    font-size: small;
    padding: 1em;
    color: black;
  }

  .add {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 10px 15px;
    border-radius: 50%;
  }
  .price{
    display: flex;
    align-items:flex-start;
  }

</style>