<script setup lang="ts">

    import flyoutPanel  from './FlyoutPanel.vue';
    import cart, { updateProductQuantity } from "../stores/cart"; 
    import { computed } from 'vue';
    import { isLoading } from '@/stores/session';

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
            <button class="button close-cart-button is-light" @click="isOpen = !isOpen">X</button>
            <h3 class="title is-2">
                Cart
                <small class="subtitle is-4">( {{ cart.length }} )</small>
            </h3>
            <h4>
                <b>Subtotal:</b> ${{ subtotal }}
            </h4>
        </template>
        <div>
            <div class="fly-out-body">
                <div v-if="!cart">
                    Your cart is empty.
                </div>
                <div v-else>
                    <div v-for="item in cart" :key="item.product.id" class="box mt-5">
                        <button class="button is-light remove-item-button" @click="(e) => updateProductQuantity(item.product.id, 0)">X</button>
                        <figure class="image is-96x96">
                            <img :src="item.product.thumbnail" :alt="item.product.title" />
                        </figure>
                        <div class="">
                            <b>{{ item.product.title }}</b> 
                            <div class="price">${{ item.product.price }}</div> 
                            <div>
                                x
                                <select :value="item.quantity" :disabled="isLoading" class="quantity" @input="(e) => updateProductQuantity(item.product.id,  +(e.target as HTMLSelectElement).value)">
                                    <option value="0">0 (delete)</option>
                                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                                </select>
                                = ${{ item.quantity * item.product.price}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fly-out-footer mt-5">
                <button class="button is-success mb-2" @click="checkout">Checkout</button>
            </div>
        </div>
    </flyoutPanel>
</template>

<style scoped>
    .close-cart-button {
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 10px 15px;
        border-radius: 50%;
    }
    .box {
        text-align: center;
        position: relative;
    }
    .remove-item-button {
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 10px 15px;
        border-radius: 50%;
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