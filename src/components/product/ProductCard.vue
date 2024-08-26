<template>
  <div class="product-card" @click="navigateToProduct">
    <div class="product-image-container">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
    </div>
    <div class="product-details">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
      <button @click.stop="addToCart" class="add-to-cart-button">Add to Cart</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { Product } from '../../services/productService';
import { useCartStore } from '../../stores/cart';
import { useAlertStore } from '../../stores/alert';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const cartStore = useCartStore();
    const alertStore = useAlertStore();

    const formatPrice = (price: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    };

    const addToCart = (event: Event) => {
      event.stopPropagation();
      cartStore.addItem(props.product);
      alertStore.showAlert(`${props.product.name} added to cart`, 'success');
    };

    const navigateToProduct = () => {
      router.push({ name: 'ProductDetail', params: { id: props.product.id } });
    };

    return {
      formatPrice,
      addToCart,
      navigateToProduct,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .product-image-container {
    height: 200px;
    overflow: hidden;
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .product-details {
    padding: 1rem;
  }

  .product-name {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
  }

  .product-price {
    font-weight: bold;
    color: $primary-color;
    margin-bottom: 0.5rem;
  }

  .add-to-cart-button {
    width: 100%;
    padding: 0.5rem;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}
</style>