<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="product.name" class="product-image" />
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-price">{{ formatPrice(product.price) }}</p>
    <button @click="addToCart" class="buy-button">Add to Cart</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Product } from '@/services/productService';
import { useCartStore } from '@/stores/cart';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup(props) {
    const cartStore = useCartStore();

    const formatPrice = (price: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    };

    const addToCart = () => {
      cartStore.addItem(props.product);
    };

    return {
      formatPrice,
      addToCart,
    };
  },
});
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
}

.product-name {
  margin: 0.5rem 0;
}

.product-price {
  font-weight: bold;
  color: #4a4a4a;
}

.buy-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>