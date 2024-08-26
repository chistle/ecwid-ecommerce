<template>
  <div class="cart-view">
    <h1>Your Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.imageUrl" :alt="item.name" class="item-image" />
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>Price: {{ formatPrice(item.price) }}</p>
          <div class="quantity-control">
            <button @click="decrementQuantity(item)" class="quantity-btn" aria-label="Decrease quantity">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="incrementQuantity(item)" class="quantity-btn" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button @click="removeItem(item.id)" class="remove-button">Remove</button>
      </div>
      <div class="cart-summary">
        <p>Total: {{ formatPrice(totalPrice) }}</p>
        <button @click="placeOrder" class="place-order-button">Place Order</button>
        <button @click="clearCart" class="clear-cart-button">Clear Cart</button>
      </div>
    </div>
    <div v-else class="empty-cart">
      Your cart is empty.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCartStore } from '@/stores/cart';

export default defineComponent({
  name: 'CartView',
  setup() {
    const cartStore = useCartStore();

    const cartItems = computed(() => cartStore.items);
    const totalPrice = computed(() => cartStore.totalPrice);

    const formatPrice = (price: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    };

    const removeItem = (productId: number) => {
      cartStore.removeItem(productId);
    };

    const clearCart = () => {
      cartStore.clearCart();
    };

    const incrementQuantity = (item: CartItem) => {
      cartStore.updateItemQuantity(item.id, item.quantity + 1);
    };

    const decrementQuantity = (item: CartItem) => {
      if (item.quantity > 1) {
        cartStore.updateItemQuantity(item.id, item.quantity - 1);
      } else {
        removeItem(item.id);
      }
    };

    const placeOrder = () => {
      // Here you would typically integrate with a payment gateway
      // and handle the order placement process
      alert('Thank you for your order!');
      cartStore.clearCart();
    };

    return {
      cartItems,
      totalPrice,
      formatPrice,
      removeItem,
      clearCart,
      incrementQuantity,
      decrementQuantity,
      placeOrder,
    };
  },
});
</script>

<style scoped>
/* ... existing styles ... */

.quantity-control {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.quantity-btn {
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
}

.quantity-control span {
  margin: 0 0.5rem;
}

.clear-cart-button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
}

/* Add transitions for smooth animations */
.cart-item {
  transition: opacity 0.3s ease;
}

.cart-item.removing {
  opacity: 0;
}
</style>