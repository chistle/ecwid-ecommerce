<template>
  <div class="category-list">
    <div
      v-for="category in categories"
      :key="category.id"
      class="category-item"
      @click="$emit('selectCategory', category.id)"
    >
      <h3>{{ category.name }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Category } from '@/services/categoryService';

export default defineComponent({
  name: 'CategoryList',
  props: {
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
  },
  emits: ['selectCategory'],
});
</script>

<style scoped>
.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

.category-item {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-item:hover {
  background-color: #e0e0e0;
}
</style>