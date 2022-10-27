<script setup lang="ts">

  import { computed } from '@vue/reactivity';
  import { ref } from 'vue';
  import { reactive } from "vue";
  import { getProducts } from "../stores/product";
  import ProductsDetailsView from './ProductsDetailsView.vue';

  const products = (reactive(getProducts()));
  const search = ref("");
  
  const results = computed(() => products.filter((product) => product.title.toLowerCase().includes(search.value.toLowerCase())));

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