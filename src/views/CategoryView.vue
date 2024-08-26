<template>
  <div v-if="category" class="category-view">
    <h1>{{ category.name }}</h1>
    <p v-if="category.description" class="category-description">{{ category.description }}</p>
    <product-list :products="products" />
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '../stores/category';
import { productService, Product } from '../services/productService';
import ProductList from '../components/product/ProductList.vue';

export default defineComponent({
  name: 'CategoryView',
  components: { ProductList },
  setup() {
    const route = useRoute();
    const categoryStore = useCategoryStore();
    const category = ref(categoryStore.getCategoryById(Number(route.params.id)));
    const products = ref<Product[]>([]);

    const loadProducts = async () => {
      if (category.value) {
        const response = await productService.getProducts({ category: category.value.id });
        products.value = response.items;
      }
    };

    onMounted(loadProducts);

    watch(() => route.params.id, async (newId) => {
      category.value = categoryStore.getCategoryById(Number(newId));
      await loadProducts();
    });

    return { category, products };
  },
});
</script>