<template>
  <div class="cart-view">
    <h1>Your Shopping Cart</h1>
    <div v-if="cartItems.length > 0" class="cart-container">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.imageUrl" :alt="item.name" class="item-image" />
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-price">{{ formatPrice(item.price) }}</p>
            <div class="quantity-control">
              <button @click="decrementQuantity(item)" class="quantity-btn" aria-label="Decrease quantity">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="incrementQuantity(item)" class="quantity-btn" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button @click="removeItem(item.id)" class="remove-button">Remove</button>
        </div>
      </div>
      <div class="cart-summary">
        <p class="total-price">Total: {{ formatPrice(totalPrice) }}</p>
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

<style lang="scss" scoped>

.cart-view {
  padding: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}

.cart-container {
  display: grid;
  gap: 2rem;

  @include respond-to('medium') {
    grid-template-columns: 2fr 1fr;
  }
}

.cart-items {
  display: grid;
  gap: 1rem;
}

.cart-item {
  display: grid;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border: 1px solid $border-color;
  border-radius: 4px;

  @include respond-to('medium') {
    grid-template-columns: auto 1fr auto auto;
  }
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.item-details {
  h3 {
    margin: 0 0 0.5rem;
  }
}

</style>