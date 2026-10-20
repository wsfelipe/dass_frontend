<script setup>
import ToastItem from "@/components/molecules/ToastItem.vue";
import { useToastStore } from "@/stores/toast";
const { messages: toasts, remove: dismiss } = useToastStore();
</script>

<template>
  <Teleport to="body">
    <div class="toasts" aria-live="polite">
      <TransitionGroup name="toast">
        <ToastItem
          v-for="t in toasts"
          :key="t.id"
          :type="t.type"
          :message="t.message"
          @close="dismiss(t.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toasts {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>
