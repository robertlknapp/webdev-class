<script setup lang="ts">

    import { ref } from 'vue';
    import { useRoute } from "vue-router";
    import { getProduct, type Product } from "../stores/product";

    const route = useRoute();
    const product = ref(null as Product | null);

    getProduct(+route.params.id).then(x => { 
      product.value = x;
      console.log("The fetch returned");
    });

    console.log("The fetch was called");

    //use v-if to product against product being null
</script>

<template>
    <div  v-if="product">
        <div class="product-image">
          <img :src="product.thumbnail" alt="product image"/>
        </div>
        <div class="product-info">
          <h3>{{ product.title }}</h3>
          <p>{{ product.description }}</p>
          <p class="price">
            <span class="curency">
              $
            </span>
            <span class="amount">
              {{ product.price }}
            </span>
          </p>
        </div>
    </div>
    <div v-else class="section">
        <h2 class="title">Product not found.</h2>
    </div>
</template>