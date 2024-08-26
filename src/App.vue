<template>
  <div id="app">
    <NavBar />
    <main class="main-content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <footer class="footer">
      <p>&copy; 2024 E-commerce Store. All rights reserved.</p>
    </footer>
    <Alert
      v-if="alertStore.isVisible"
      :message="alertStore.message"
      :type="alertStore.type"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
    return { alertStore };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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