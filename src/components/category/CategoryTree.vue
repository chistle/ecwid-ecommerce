<template>
  <ul class="category-tree" role="tree">
    <li
      v-for="category in categories"
      :key="category.id"
      class="category-item"
      role="treeitem"
      :aria-expanded="expandedCategories.includes(category.id)"
    >
      <category-card
        :category="category"
        :is-expanded="expandedCategories.includes(category.id)"
        @toggle="toggleCategory(category)"
        @keydown="handleKeyDown($event, category)"
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
import { useRouter } from 'vue-router';
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
  setup(props) {
    const router = useRouter();
    const expandedCategories = ref<number[]>([]);

    const toggleCategory = (category: Category) => {
      const index = expandedCategories.value.indexOf(category.id);
      if (index === -1) {
        expandedCategories.value.push(category.id);
      } else {
        expandedCategories.value.splice(index, 1);
      }
      router.push({ name: 'Category', params: { id: category.id } });
    };

    const handleKeyDown = (event: KeyboardEvent, category: Category) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCategory(category);
      }
    };

    return { expandedCategories, toggleCategory, handleKeyDown };
  },
});
</script>

<style scoped>
.category-tree {
  list-style-type: none;
  padding-left: 1rem;
}

.category-item {
  margin-bottom: 0.5rem;
}

.subcategories {
  margin-left: 1rem;
}

.loading {
  padding: 0.5rem;
  color: #666;
  font-style: italic;
}
</style>