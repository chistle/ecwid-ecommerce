<template>
  <transition name="fade">
    <div v-if="isVisible" class="alert" :class="type">
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'Alert',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'success',
      validator: (value: string) => ['success', 'error', 'info'].includes(value),
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    const isVisible = ref(false);

    onMounted(() => {
      isVisible.value = true;
      setTimeout(() => {
        isVisible.value = false;
      }, props.duration);
    });

    return { isVisible };
  },
});
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  z-index: 1000;

  &.success {
    background-color: #4caf50;
  }

  &.error {
    background-color: #f44336;
  }

  &.info {
    background-color: #2196f3;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>