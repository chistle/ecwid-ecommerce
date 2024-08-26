<template>
  <div class="product-detail">
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumbs">
        <li><router-link to="/">Home</router-link></li>
        <li v-for="category in breadcrumbs" :key="category.id">
          <router-link :to="{ name: 'Category', params: { id: category.id } }">
            {{ category.name }}
          </router-link>
        </li>
        <li v-if="product">{{ product.name }}</li>
      </ol>
    </nav>

    <div v-if="loading" class="loading">Loading product details...</div>
    <div v-else-if="product" class="product-content">
      <div class="product-image-container">
        <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      </div>
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ formatPrice(product.price) }}</p>
        <div class="description" v-html="product.description"></div>
        <button @click="addToCart" class="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
    <div v-else class="error">Product not found</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { productService, Product } from '../services/productService';
import { useCategoryStore } from '../stores/category';
import { useCartStore } from '../stores/cart';

export default defineComponent({
  name: 'ProductDetailView',
  setup() {
    const route = useRoute();
    const product = ref<Product | null>(null);
    const loading = ref(true);
    const cartStore = useCartStore();
    const categoryStore = useCategoryStore();

    const loadProduct = async () => {
      const productId = Number(route.params.id);
      try {
        product.value = await productService.getProduct(productId);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        loading.value = false;
      }
    };

    const breadcrumbs = computed(() => {
      if (!product.value || !product.value.categoryIds) return [];
      return categoryStore.getCategoryPath(product.value.categoryIds[0]);
    });

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
      loading,
      breadcrumbs,
      formatPrice,
      addToCart,
    };
  },
});
</script>

<style scoped>
.product-detail {
  padding: 2rem;
}

.breadcrumbs {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.breadcrumbs li {
  display: inline;
}

.breadcrumbs li:not(:last-child)::after {
  content: ' > ';
  margin: 0 0.5rem;
}

.product-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.product-image-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: contain;
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

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

@media (min-width: 768px) {
  .product-content {
    flex-direction: row;
  }

  .product-image-container {
    flex: 1;
    max-width: 50%;
  }

  .product-info {
    flex: 1;
  }
}
</style>