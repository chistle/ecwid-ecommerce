<template>
  <div class="product-list">
    <h2>{{ currentCategory ? currentCategory.name : 'All Products' }}</h2>
    <div v-if="loading" class="loading">Loading products...</div>
    <div v-else-if="products.length === 0" class="no-products">
      No products found in this category.
    </div>
    <div v-else class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Product } from '@/services/productService';
import { useCategoryStore } from '@/stores/category';
import ProductCard from './ProductCard.vue';

export default defineComponent({
  name: 'ProductList',
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const route = useRoute();
    const categoryStore = useCategoryStore();

    const currentCategory = computed(() => {
      const categoryId = Number(route.params.id);
      return categoryStore.getCategoryById(categoryId);
    });

    return {
      currentCategory,
    };
  },
});
</script>

<style scoped>
.product-list {
  padding: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.loading, .no-products {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}
</style>