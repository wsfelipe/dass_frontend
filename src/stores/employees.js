import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { employeeService } from '@/services/employeeService';

export const useEmployeesStore = defineStore('employees', () => {
  const items = ref([]);
  const meta = ref({ page: 1, totalPages: 1, total: 0 });
  const loading = ref(false);
  const error = ref(null);

  const fetchList = async (params = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await employeeService.list(params);
      items.value = res.data || res.items || [];
      meta.value = res.meta || { page: params.page || 1, totalPages: 1, total: 0 };
    } catch (e) {
      error.value = e.message || 'Erro ao carregar funcionários';
    } finally {
      loading.value = false;
    }
  };

  const create = async (payload) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await employeeService.create(payload);
      items.value.unshift(res.data || res);
      meta.value.total = (meta.value.total || 0) + 1;
    } finally {
      loading.value = false;
    }
  };

  const update = async (id, payload) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await employeeService.update(id, payload);
      const idx = items.value.findIndex((i) => i.id === id);
      if (idx !== -1) items.value[idx] = res.data || res;
    } finally {
      loading.value = false;
    }
  };

  const remove = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await employeeService.remove(id);
      items.value = items.value.filter((i) => i.id !== id);
      meta.value.total = Math.max(0, (meta.value.total || 0) - 1);
    } finally {
      loading.value = false;
    }
  };

  return { items, meta, loading, error, fetchList, create, update, remove };
});
