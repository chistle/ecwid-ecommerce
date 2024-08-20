import { apiService } from './api';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  // Add other relevant fields
}

export interface ProductsResponse {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: Product[];
}

class ProductService {
  async getProducts(params: {
    offset?: number;
    limit?: number;
    category?: number;
  } = {}): Promise<ProductsResponse> {
    return apiService.get<ProductsResponse>('/products', params);
  }

  async getProduct(id: number): Promise<Product> {
    return apiService.get<Product>(`/products/${id}`);
  }
}

export const productService = new ProductService();