<script setup>
import AppModal from "@/components/molecules/AppModal.vue";
import AppButton from "@/components/atoms/AppButton.vue";

defineProps({
  open: Boolean,
  title: { type: String, default: "<strong>Confirmar</strong> ação" },
  message: String,
  confirmText: { type: String, default: "Confirmar" },
  loading: Boolean,
});
defineEmits(["confirm", "cancel"]);
</script>

<template>
  <AppModal :open="open" :title="title" width="440px" @close="$emit('cancel')">
    <p class="msg">{{ message }}</p>
    <div class="actions">
      <AppButton variant="ghost" @click="$emit('cancel')">Cancelar</AppButton>
      <AppButton variant="danger" :loading="loading" @click="$emit('confirm')">{{
        confirmText
      }}</AppButton>
    </div>
  </AppModal>
</template>

<style scoped>
.msg {
  margin: 0 0 var(--space-5);
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
}
</style>
