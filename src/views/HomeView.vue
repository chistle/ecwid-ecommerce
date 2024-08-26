<template>
  <div class="home">
    <h1>Welcome to Our Store</h1>
    <div class="content">
      <aside class="sidebar">
        <CategoryList @selectCategory="loadProducts" />
      </aside>
      <main class="main-content">
        <ProductList :products="products" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import CategoryList from '../components/category/CategoryList.vue';
import ProductList from '../components/product/ProductList.vue';
import { useCategoryStore } from '../stores/category';
import { productService, Product } from '../services/productService';

export default defineComponent({
  name: 'HomeView',
  components: {
    CategoryList,
    ProductList,
  },
  setup() {
    const categoryStore = useCategoryStore();
    const products = ref<Product[]>([]);

    const loadProducts = async (categoryId?: number) => {
      try {
        const response = await productService.getProducts({
          limit: 20,
          category: categoryId,
        });
        products.value = response.items;
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    onMounted(async () => {
      await categoryStore.fetchCategories();
      await loadProducts();
    });

    return {
      products,
      loadProducts,
    };
  },
});
</script>

<style scoped>
.content {
  display: flex;
  gap: 2rem;
}

.sidebar {
  width: 300px;
  flex-shrink: 0;
}

.main-content {
  flex-grow: 1;
}
</style>