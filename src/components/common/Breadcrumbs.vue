<template>
  <nav aria-label="Breadcrumb">
    <ol class="breadcrumb">
      <li><router-link to="/">Home</router-link></li>
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.id">
        <router-link
          v-if="index < breadcrumbs.length - 1"
          :to="{ name: 'Category', params: { id: crumb.id } }"
        >
          {{ crumb.name }}
        </router-link>
        <span v-else>{{ crumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Category } from '@/types';
import { useCategoryStore } from '@/stores/category';

export default defineComponent({
  name: 'Breadcrumb',
  props: {
    category: {
      type: Object as PropType<Category>,
      required: true,
    },
  },
  setup(props) {
    const categoryStore = useCategoryStore();

    const breadcrumbs = computed(() => {
      return categoryStore.getCategoryPath(props.category.id);
    });

    return { breadcrumbs };
  },
});
</script>

<style scoped>
.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.breadcrumb li:not(:last-child)::after {
  content: '>';
  margin: 0 0.5rem;
}

.breadcrumb a {
  color: #007bff;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}
</style>