import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const messages = ref([]);

  const success = (message) => add({ id: Date.now(), type: 'success', message });
  const error = (message) => add({ id: Date.now(), type: 'error', message });

  const add = (msg) => messages.value.push({ ...msg, id: msg.id || Date.now() });
  const remove = (id) => { const idx = messages.value.findIndex(m => m.id === id); if (idx > -1) messages.value.splice(idx, 1); };

  return { messages, add, remove, success, error };
});
