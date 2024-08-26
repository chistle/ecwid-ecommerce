// src/services/categoryService.ts
import { apiService } from './api';
import { Category, CategoriesResponse } from '@/types';

class CategoryService {
  async getCategories(): Promise<CategoriesResponse> {
    return apiService.get<CategoriesResponse>('/categories');
  }

  async getCategory(id: number): Promise<Category> {
    return apiService.get<Category>(`/categories/${id}`);
  }

  async getSubcategories(parentId: number): Promise<Category[]> {
    const response = await apiService.get<CategoriesResponse>('/categories', { parent: parentId });
    return response.items;
  }
}

export const categoryService = new CategoryService();