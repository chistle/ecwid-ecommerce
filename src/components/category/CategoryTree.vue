<template>
  <ul class="category-tree" role="tree">
    <li
      v-for="(category, index) in categories"
      :key="category.id"
      class="category-item"
      role="treeitem"
      :aria-expanded="expandedCategories.includes(category.id)"
    >
      <category-card
        :category="category"
        :is-expanded="expandedCategories.includes(category.id)"
        @toggle="toggleCategory(category)"
        @keydown="handleKeyDown($event, index, category)"
        tabindex="0"
      />
      <suspense v-if="expandedCategories.includes(category.id)">
        <template #default>
          <lazy-category-tree
            v-if="category.children && category.children.length > 0"
            :category-id="category.id"
            class="subcategories"
          />
        </template>
        <template #fallback>
          <div class="loading">Loading subcategories...</div>
        </template>
      </suspense>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Category } from '@/types';
import CategoryCard from './CategoryCard.vue';
import { defineAsyncComponent } from 'vue';

const LazyCategoryTree = defineAsyncComponent(() =>
  import('./LazyCategoryTree.vue')
);

export default defineComponent({
  name: 'CategoryTree',
  components: { CategoryCard, LazyCategoryTree },
  props: {
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
  },
  setup() {
    const expandedCategories = ref<number[]>([]);

    const toggleCategory = (category: Category) => {
      const index = expandedCategories.value.indexOf(category.id);
      if (index === -1) {
        expandedCategories.value.push(category.id);
      } else {
        expandedCategories.value.splice(index, 1);
      }
    };

    const handleKeyDown = (event: KeyboardEvent, index: number, category: Category) => {
      // ... (keep the existing keyboard navigation logic)
    };

    return { expandedCategories, toggleCategory, handleKeyDown };
  },
});
</script>

<style scoped>
/* ... (keep existing styles) */

.loading {
  padding: 0.5rem;
  color: #666;
  font-style: italic;
}
</style>