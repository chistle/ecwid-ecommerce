<template>
  <nav class="nav-bar">
    <router-link to="/" class="nav-logo">E-commerce Store</router-link>
    <div class="nav-links">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/cart" class="nav-link">
        Cart
        <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCartStore } from '@/stores/cart';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const cartStore = useCartStore();
    const cartItemCount = computed(() => cartStore.totalItems);

    return {
      cartItemCount,
    };
  },
});
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  position: relative;
}

.nav-link:hover {
  color: #007bff;
}

.cart-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #dc3545;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
}
</style>