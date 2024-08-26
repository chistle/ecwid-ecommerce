<template>
  <div v-if="category" class="category-view">
    <Breadcrumb :category="category" />
    <h1>{{ category.name }}</h1>
    <p v-if="category.description" class="category-description">{{ category.description }}</p>

    <div class="subcategories" v-if="subcategories.length > 0">
      <h2>Subcategories</h2>
      <category-tree :categories="subcategories" />
    </div>

    <div class="products">
      <h2>Products</h2>
      <product-list :products="products" :loading="loading" />
    </div>
  </div>
  <div v-else-if="loading" class="loading">Loading category...</div>
  <div v-else class="error">Category not found</div>
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

<style scoped>
.category-view {
  padding: 1rem;
}

.subcategories, .products {
  margin-top: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}
</style>