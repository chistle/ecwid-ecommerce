import { defineStore } from 'pinia';
import { Category } from '@/types';
import { categoryService } from '@/services/categoryService';

interface CategoryState {
  categories: Category[];
  searchQuery: string;
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: [],
    searchQuery: '',
  }),
  getters: {
    flattenedCategories(): Category[] {
      const flatten = (categories: Category[]): Category[] => {
        return categories.reduce((acc, category) => {
          acc.push(category);
          if (category.children && category.children.length > 0) {
            acc.push(...flatten(category.children));
          }
          return acc;
        }, [] as Category[]);
      };
      return flatten(this.categories);
    },
    searchCategories(): (query: string) => Category[] {
      return (query: string) => {
        if (!query) return this.categories;
        const lowerQuery = query.toLowerCase();
        return this.flattenedCategories.filter(category =>
          category.name.toLowerCase().includes(lowerQuery)
        );
      };
    },
    getCategoryById(): (id: number) => Category | undefined {
      return (id: number) => this.flattenedCategories.find(category => category.id === id);
    },
    getCategoryPath(): (id: number) => Category[] {
      return (id: number) => {
        const path: Category[] = [];
        let currentCategory = this.getCategoryById(id);
        while (currentCategory) {
          path.unshift(currentCategory);
          currentCategory = currentCategory.parentId ? this.getCategoryById(currentCategory.parentId) : undefined;
        }
        return path;
      };
    },
  },
  actions: {
    async fetchCategories() {
      const response = await categoryService.getCategories();
      this.categories = response.items;
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
    async fetchSubcategories(parentId: number): Promise<Category[]> {
      // Implement this method in your categoryService
      const subcategories = await categoryService.getSubcategories(parentId);
      const parentCategory = this.getCategoryById(parentId);
      if (parentCategory) {
        parentCategory.children = subcategories;
      }
      return subcategories;
    },
  },
});