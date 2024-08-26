<template>
  <div class="category-list">
    <div class="search-container">
      <input
        v-model="searchQuery"
        placeholder="Search categories..."
        @input="searchCategories"
        aria-label="Search categories"
      />
    </div>
    <nav aria-label="Category navigation">
      <category-tree :categories="filteredCategories" />
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category';
import CategoryTree from './CategoryTree.vue';

export default defineComponent({
  name: 'CategoryList',
  components: { CategoryTree },
  setup() {
    const categoryStore = useCategoryStore();
    const searchQuery = ref('');

    const filteredCategories = computed(() => {
      return categoryStore.searchCategories(searchQuery.value);
    });

    const searchCategories = () => {
      categoryStore.setSearchQuery(searchQuery.value);
    };

    onMounted(async () => {
      await categoryStore.fetchCategories();
    });

    return { searchQuery, filteredCategories, searchCategories };
  },
});
</script>

<style scoped>
.category-list {
  max-width: 800px;
  margin: 0 auto;
}

.search-container {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>