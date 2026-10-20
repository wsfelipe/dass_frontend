<script setup>
import AppButton from "@/components/atoms/AppButton.vue";
defineProps({ page: Number, totalPages: Number, total: Number });
defineEmits(["change"]);
</script>

<template>
  <nav class="pagination" aria-label="Paginação">
    <span class="pagination__info"
      >{{ total }} registro(s) · Página {{ page }} de {{ totalPages }}</span
    >
    <div class="pagination__actions">
      <AppButton
        variant="secondary"
        size="sm"
        :disabled="page <= 1"
        @click="$emit('change', page - 1)"
        >Anterior</AppButton
      >
      <AppButton
        variant="secondary"
        size="sm"
        :disabled="page >= totalPages"
        @click="$emit('change', page + 1)"
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
