<template>
  <category-tree :categories="subcategories" />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category';
import CategoryTree from './CategoryTree.vue';

export default defineComponent({
  name: 'LazyCategoryTree',
  components: { CategoryTree },
  props: {
    categoryId: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  async setup(props) {
    const categoryStore = useCategoryStore();
    const subcategories = ref(await categoryStore.fetchSubcategories(props.categoryId));

    return { subcategories };
  },
});
</script>