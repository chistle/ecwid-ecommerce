import { defineStore } from 'pinia';
import { Category } from '../types/category';
import { categoryService } from '../services/categoryService';

interface CategoryState {
  categories: Category[];
  categoryMap: Map<number, Category>;
  searchQuery: string;
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: [],
    categoryMap: new Map(),
    searchQuery: '',
  }),
  getters: {
    getCategoryById: (state) => (id: number) => state.categoryMap.get(id),
    getCategoryPath: (state) => (id: number) => {
      const path: Category[] = [];
      let currentId = id;
      while (currentId) {
        const category = state.categoryMap.get(currentId);
        if (category) {
          path.unshift(category);
          currentId = category.parentId;
        } else {
          break;
        }
      }
      return path;
    },
    flattenedCategories: (state) => {
      const flatten = (categories: Category[]): Category[] => {
        return categories.reduce((acc, category) => {
          acc.push(category);
          if (category.children && category.children.length > 0) {
            acc.push(...flatten(category.children));
          }
          return acc;
        }, [] as Category[]);
      };
      return flatten(state.categories);
    },
    searchCategories: (state) => {
      return (query: string) => {
        if (!query) return state.categories;
        const lowerQuery = query.toLowerCase();
        return state.flattenedCategories.filter(category =>
          category.name.toLowerCase().includes(lowerQuery)
        );
      };
    },
  },
  actions: {
    async fetchCategories() {
      const response = await categoryService.getCategories();
      this.categories = response.items;
      this.updateCategoryMap(this.categories);
    },
    async fetchCategoryById(id: number) {
      if (this.categoryMap.has(id)) {
        return this.categoryMap.get(id);
      }
      const category = await categoryService.getCategory(id);
      this.categoryMap.set(id, category);
      return category;
    },
    async fetchSubcategories(parentId: number) {
      const subcategories = await categoryService.getSubcategories(parentId);
      this.updateCategoryMap(subcategories);
      return subcategories;
    },
    updateCategoryMap(categories: Category[]) {
      categories.forEach(category => {
        this.categoryMap.set(category.id, category);
      });
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
  },
});