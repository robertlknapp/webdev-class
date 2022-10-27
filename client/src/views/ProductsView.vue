<script setup lang="ts">

  import { computed } from '@vue/reactivity';
  import { ref } from 'vue';
  import { reactive } from "vue";
  import { getProducts } from "../stores/product";

  const products = (reactive(getProducts()));
  const search = ref("");
  
  const results = computed(() => products.filter((product) => product.title.toLowerCase().includes(search.value.toLowerCase())));

  // Another way to handle this - imperative programming instead of functional programming //
  //results can also be a reactive array with const results = reactive(products);
  //convert json to typescript easy online -> put in stores/product.ts and include a productdocument and product inferface export (see professor's code)
  //import type Product
  //results can then be found with similar code as before but in searchProducts function
  //call function in routerlink

  //OR use watch!
  //watch(search, searchProducts); firsrt param reactive, second is function to call when watch sees a changes

</script>

<template>

  <div>

    <div class="control">
      <input class="input" type="text" v-model="search" placeholder="Search"/>
    </div>

    <div class="products">
      <router-link class="product" v-for="product in results" :key="product.id" :to="`/product/${product.id}`">
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
      </router-link>
    </div>

  </div>

</template>

<style scoped>
  .products {
    display: flex;
    flex-wrap: wrap;
    background-color: aliceblue;
  }

  .product {
    flex-basis: 15em;
    margin: 1em;
    border: 1px solid black;
    border-radius: 5px;
    padding: 1em;
    background-color: white;
  }

  .product-info {
    font-size: small;
    padding: 1em;
  }

  .price{
    display: flex;
    align-items:flex-start;
  }

</style>