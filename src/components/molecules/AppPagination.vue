<script setup>
import { computed } from "vue";
import AppButton from "@/components/atoms/AppButton.vue";
const props = defineProps({ page: Number, totalPages: Number, total: Number });
defineEmits(["change"]);
const safeTotalPages = computed(() => Math.max(1, props.totalPages || 1));
</script>

<template>
  <nav class="pagination" aria-label="Paginação">
    <span class="pagination__info"
      >{{ props.total }} registro(s) · Página {{ props.page }} de {{ safeTotalPages }}</span
    >
    <div class="pagination__actions">
      <AppButton
        variant="secondary"
        size="sm"
        :disabled="props.page <= 1"
        @click="$emit('change', props.page - 1)"
        >Anterior</AppButton
      >
      <AppButton
        variant="secondary"
        size="sm"
        :disabled="props.page >= safeTotalPages"
        @click="$emit('change', props.page + 1)"
        >Próxima</AppButton
      >
    </div>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
}
.pagination__info {
  font-size: 13px;
  color: var(--color-muted);
}
.pagination__actions {
  display: flex;
  gap: var(--space-2);
}
</style>
