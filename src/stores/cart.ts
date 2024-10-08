import { defineStore } from 'pinia';
import { Product } from '../services/productService';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
  }),
  getters: {
    totalItems: (state): number => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state): number => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  actions: {
    addItem(product: Product): void {
      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem(productId: number): void {
      const index = this.items.findIndex(item => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    clearCart(): void {
      this.items = [];
    },
    updateItemQuantity(productId: number, quantity: number): void {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          this.removeItem(productId);
        }
      }
    },
  },
});