<template>
  <div class="category-view">
    <div v-if="category" class="category-content">
      <Breadcrumb :category="category" class="breadcrumb" />
      <h1 class="category-title">{{ category.name }}</h1>
      <p v-if="category.description" class="category-description">{{ category.description }}</p>

      <div class="category-sections">
        <div v-if="subcategories.length > 0" class="subcategories">
          <h2 class="section-title">Subcategories</h2>
          <CategoryTree :categories="subcategories" />
        </div>

        <div class="products">
          <h2 class="section-title">Products</h2>
          <ProductList :products="products" :loading="loading" />
        </div>
      </div>
    </div>
    <div v-else-if="loading" class="loading">
      <div class="loader"></div>
      <p>Loading category...</p>
    </div>
    <div v-else class="error">Category not found</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '../stores/category';
import { productService, Product } from '../services/productService';
import CategoryTree from '../components/category/CategoryTree.vue';
import ProductList from '../components/product/ProductList.vue';
import Breadcrumb from '../components/common/Breadcrumbs.vue';

export default defineComponent({
  name: 'CategoryView',
  components: { CategoryTree, ProductList, Breadcrumb },
  setup() {
    const route = useRoute();
    const categoryStore = useCategoryStore();
    const category = ref(null);
    const subcategories = ref([]);
    const products = ref<Product[]>([]);
    const loading = ref(true);

    const loadCategoryData = async (categoryId: number) => {
      loading.value = true;
      try {
        category.value = await categoryStore.fetchCategoryById(categoryId);
        subcategories.value = await categoryStore.fetchSubcategories(categoryId);
        const response = await productService.getProducts({ category: categoryId });
        products.value = response.items;
      } catch (error) {
        console.error('Error loading category data:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => loadCategoryData(Number(route.params.id)));

    watch(() => route.params.id, (newId) => loadCategoryData(Number(newId)));

    return { category, subcategories, products, loading };
  },
});
</script>

<style lang="scss" scoped>
.category-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.category-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.breadcrumb {
  margin-bottom: 1rem;
}

.category-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
}

.category-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.category-sections {
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.subcategories, .products {
  flex: 1;
}

.section-title {
  font-size: 1.5rem;
  color: #495057;
  margin-bottom: 1rem;
  font-weight: 600;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>