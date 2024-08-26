<template>
  <div class="category-card" @click="$emit('toggle')">
    <img :src="category.thumbnailUrl" :alt="category.name" class="category-image" />
    <div class="category-info">
      <h3 class="category-name">{{ category.name }}</h3>
      <p class="category-product-count">{{ category.productCount }} products</p>
    </div>
    <button v-if="hasChildren" class="toggle-btn" :aria-expanded="isExpanded">
      {{ isExpanded ? '▼' : '►' }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Category } from '@/types';

export default defineComponent({
  name: 'CategoryCard',
  props: {
    category: {
      type: Object as PropType<Category>,
      required: true,
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle'],
  setup(props) {
    const hasChildren = computed(() => props.category.children && props.category.children.length > 0);

    return { hasChildren };
  },
});
</script>

<style scoped>
.category-card {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.category-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.category-info {
  flex: 1;
}

.category-name {
  margin: 0;
  font-size: 1rem;
}

.category-product-count {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}
</style>