<template>
  <div v-if="product" class="product-detail">
    <img :src="product.imageUrl" :alt="product.name" class="product-image" />
    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <p class="price">{{ formatPrice(product.price) }}</p>
      <p class="description">{{ product.description }}</p>
      <button @click="addToCart" class="add-to-cart-button">Add to Cart</button>
    </div>
  </div>
  <div v-else class="loading">Loading product details...</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { productService, Product } from '../services/productService';
import { useCartStore } from '../stores/cart';

export default defineComponent({
  name: 'ProductDetailView',
  setup() {
    const route = useRoute();
    const product = ref<Product | null>(null);
    const cartStore = useCartStore();

    const loadProduct = async () => {
      const productId = Number(route.params.id);
      try {
        product.value = await productService.getProduct(productId);
      } catch (error) {
        console.error('Failed to load product:', error);
      }
    };

    const formatPrice = (price: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    };

    const addToCart = () => {
      if (product.value) {
        cartStore.addItem(product.value);
      }
    };

    onMounted(loadProduct);

    return {
      product,
      formatPrice,
      addToCart,
    };
  },
});
</script>

<style scoped>
.product-detail {
  display: flex;
  padding: 2rem;
  gap: 2rem;
}

.product-image {
  max-width: 50%;
  height: auto;
}

.product-info {
  flex: 1;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a4a4a;
}

.description {
  margin-top: 1rem;
  line-height: 1.6;
}

.add-to-cart-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
</style>