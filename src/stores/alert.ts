import { defineStore } from 'pinia';

interface AlertState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

export const useAlertStore = defineStore('alert', {
  state: (): AlertState => ({
    message: '',
    type: 'success',
    isVisible: false,
  }),
  actions: {
    showAlert(message: string, type: 'success' | 'error' | 'info' = 'success') {
      this.message = message;
      this.type = type;
      this.isVisible = true;
    },
    hideAlert() {
      this.isVisible = false;
    },
  },
});