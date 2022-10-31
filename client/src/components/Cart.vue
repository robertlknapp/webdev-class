<script setup lang="ts">

    import flyoutPanel  from './FlyoutPanel.vue';
    import cart, { updateProductQuantity } from "../stores/cart"; 
    import { computed } from 'vue';

    const { isOpen } = defineProps<{
        isOpen: boolean;
    }>();

    function closeCart() {

    };

    function checkout() {

    };

    const subtotal = computed(() => cart.reduce((total, item) => total + item.quantity * item.product.price, 0));

</script>

<template>
    <flyoutPanel :is-open="isOpen">
        <template #header>
            <h3 class="title is-2">Cart</h3>
            <button class="button is-danger" @click="closeCart()">Close</button>
        </template>
        <div class="fly-out-body">
            <div v-if="!cart">
                Your cart is empty.
            </div>
            <div v-else>
                    <div v-for="item in cart" :key="item.product.id" class="box">

                            <figure class="image is-96x96">
                                <img :src="item.product.thumbnail" :alt="item.product.title" />
                            </figure>
                            <div class="">
                                <b>{{ item.product.title }}</b> 
                                <div class="price">${{ item.product.price }}</div> 
                                <div>
                                    x 
                                    <select :value="item.quantity" class="quantity" @input="(e) => updateProductQuantity(item.product.id,  +(e.target as HTMLSelectElement).value)">
                                        <option value="0">0 (delete)</option>
                                        <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                                    </select>
                                    = ${{ item.quantity * item.product.price}}</div>
                                
                            </div>
                    </div>
                </div>
        </div>
    </flyoutPanel>
</template>

<style scoped>
    .box {
        text-align: center;
    }
    .image {            /* note that this is the image class not the image tag */
        border: 1px solid #000;
        margin: auto;
    }
    .price {
        font-size: 1.5em;
    }
    .quantity {
        width: 40px;
        border-radius: 10px;
        border: 0;
        background-color: aliceblue;
    }
</style>