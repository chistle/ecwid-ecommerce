<template>
  <div class="home">
    <h1>Welcome to Our Store</h1>
    <CategoryList :categories="categories" @selectCategory="loadProducts" />
    <ProductList :products="products" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import CategoryList from '../components/category/CategoryList.vue';
import ProductList from '../components/product/ProductList.vue';
import { categoryService, Category } from '../services/categoryService';
import { productService, Product } from '../services/productService';

export default defineComponent({
  name: 'HomeView',
  components: {
    CategoryList,
    ProductList,
  },
  setup() {
    const categories = ref<Category[]>([]);
    const products = ref<Product[]>([]);

    const loadCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        categories.value = response.items;
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

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

    onMounted(() => {
      loadCategories();
      loadProducts();
    });

    return {
      categories,
      products,
      loadProducts,
    };
  },
});
</script>