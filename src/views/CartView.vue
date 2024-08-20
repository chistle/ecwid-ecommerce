<template>
  <div class="cart-view">
    <h1>Your Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.imageUrl" :alt="item.name" class="item-image" />
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>Price: {{ formatPrice(item.price) }}</p>
          <p>Quantity: {{ item.quantity }}</p>
        </div>
        <button @click="removeItem(item.id)" class="remove-button">Remove</button>
      </div>
      <div class="cart-summary">
        <p>Total: {{ formatPrice(totalPrice) }}</p>
        <button @click="placeOrder" class="place-order-button">Place Order</button>
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
      placeOrder,
    };
  },
});
</script>

<style scoped>
.cart-view {
  padding: 2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
}

.item-image {
  width: 100px;
  height: auto;
  margin-right: 1rem;
}

.item-details {
  flex: 1;
}

.remove-button {
  padding: 0.5rem 1rem;
  background-color: #ff4136;
  color: white;
  border: none;
  cursor: pointer;
}

.cart-summary {
  margin-top: 2rem;
  text-align: right;
}

.place-order-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.empty-cart {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}
</style>