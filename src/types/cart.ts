interface CartItem extends Product {
  quantity: number;
  maxQuantity?: number;
}

export interface CartState {
  items: CartItem[];
}