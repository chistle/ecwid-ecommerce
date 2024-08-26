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
          <button @click="removeItem(item.id)" class="remove-button">
            <span class="remove-icon">×</span>
          </button>
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
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    color: #333;
  }
}

.cart-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.cart-items {
  padding: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
}

.item-details {
  flex-grow: 1;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    color: #333;
  }

  .item-price {
    font-weight: bold;
    color: #4a4a4a;
  }
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  .quantity-btn {
    background-color: #f0f0f0;
    border: none;
    width: 24px;
    height: 24px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #e0e0e0;
    }
  }

  span {
    margin: 0 0.5rem;
    min-width: 24px;
    text-align: center;
  }
}

.remove-button {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.5rem;
  color: #999;
  transition: color 0.2s;

  &:hover {
    color: #ff4136;
  }
}

.cart-summary {
  background-color: #f8f9fa;
  padding: 1.5rem;
  text-align: right;

  .total-price {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
}

.place-order-button,
.clear-cart-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.place-order-button {
  background-color: #4CAF50;
  color: white;
  margin-right: 1rem;

  &:hover {
    background-color: #45a049;
  }
}

.clear-cart-button {
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #d32f2f;
  }
}

.empty-cart {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;
}
</style>