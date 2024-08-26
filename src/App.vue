<template>
  <div id="app">
    <NavBar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="footer">
      <p>&copy; {{ currentYear }} E-commerce Store. All rights reserved.</p>
    </footer>
    <Alert v-if="alertStore.isVisible" :message="alertStore.message" :type="alertStore.type" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import NavBar from './components/common/NavBar.vue';
import Alert from './components/common/Alert.vue';
import { useAlertStore } from './stores/alert';

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    Alert,
  },
  setup() {
    const alertStore = useAlertStore();
    const currentYear = computed(() => new Date().getFullYear());

    return { alertStore, currentYear };
  },
});
</script>

<style>
#app {
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background-color: #f8f9fa;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>