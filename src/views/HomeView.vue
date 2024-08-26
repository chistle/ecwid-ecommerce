<template>
  <div class="home">
    <h1 class="home-title">Welcome to Our Store</h1>
    <div class="content">
      <aside class="sidebar">
        <h2 class="sidebar-title">Categories</h2>
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

<style lang="scss" scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.home-title {
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 300;
  letter-spacing: 1px;
}

.content {
  display: flex;
  gap: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.sidebar {
  width: 300px;
  flex-shrink: 0;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-right: 1px solid #e9ecef;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }
}

.sidebar-title {
  font-size: 1.25rem;
  color: #495057;
  margin-bottom: 1rem;
  font-weight: 600;
}

.main-content {
  flex-grow: 1;
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }
}
</style>