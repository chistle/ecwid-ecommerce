import { apiService } from './api';

export interface Category {
  id: number;
  name: string;
  parentId: number;
  orderBy: number;
}

export interface CategoriesResponse {
  items: Category[];
}

class CategoryService {
  async getCategories(): Promise<CategoriesResponse> {
    return apiService.get<CategoriesResponse>('/categories');
  }

  async getCategory(id: number): Promise<Category> {
    return apiService.get<Category>(`/categories/${id}`);
  }
}

export const categoryService = new CategoryService();