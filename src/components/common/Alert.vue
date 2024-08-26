<template>
  <Transition name="fade">
    <div v-if="isVisible" :class="['alert', type]" role="alert">
      <div class="alert-content">
        <component :is="icon" class="alert-icon" aria-hidden="true" />
        <p class="alert-message">{{ message }}</p>
      </div>
      <button @click="close" class="alert-close" aria-label="Close alert">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="close-icon">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue';
import { CheckCircle, AlertCircle, InfoIcon } from 'lucide-vue-next';

type AlertType = 'success' | 'error' | 'info';

export default defineComponent({
  name: 'Alert',
  components: {
    CheckCircle,
    AlertCircle,
    InfoIcon,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<AlertType>,
      default: 'info',
      validator: (value: string): boolean => ['success', 'error', 'info'].includes(value),
    },
    duration: {
      type: Number,
      default: 5000,
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const isVisible = ref(false);

    const icon = {
      success: CheckCircle,
      error: AlertCircle,
      info: InfoIcon,
    }[props.type];

    const close = () => {
      isVisible.value = false;
      emit('close');
    };

    onMounted(() => {
      isVisible.value = true;
      if (props.autoClose) {
        setTimeout(close, props.duration);
      }
    });

    return { isVisible, icon, close };
  },
});
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  max-width: 400px;
  width: calc(100% - 40px);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;

  &-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  &-message {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }

  &-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }

    .close-icon {
      width: 16px;
      height: 16px;
    }
  }

  &.success {
    background-color: #d4edda;
    color: #155724;
  }

  &.error {
    background-color: #f8d7da;
    color: #721c24;
  }

  &.info {
    background-color: #d1ecf1;
    color: #0c5460;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>