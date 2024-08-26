<template>
  <div class="product-card" @click="navigateToProduct">
    <img :src="product.imageUrl" :alt="product.name" class="product-image" />
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-price">{{ formatPrice(product.price) }}</p>
    <button @click.stop="addToCart" class="buy-button">Add to Cart</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { Product } from '../../services/productService';
import { useCartStore } from '../../stores/cart';

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

    const formatPrice = (price: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    };

    const addToCart = (event: Event) => {
      event.stopPropagation();
      cartStore.addItem(props.product);
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

<style lang="scss">
.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem;
  text-align: center;
  transition: box-shadow 0.3s ease;

  @include respond-to(md) {
    flex: 0 0 calc(50% - 2rem);
  }

  @include respond-to(lg) {
    flex: 0 0 calc(33.333% - 2rem);
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .product-image {
    max-width: 100%;
    height: auto;
  }

  .product-name {
    margin: 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .product-price {
    font-weight: bold;
    color: $primary-color;
  }

  .buy-button {
    @include button-style($primary-color);
    margin-top: 1rem;
  }
}
</style>