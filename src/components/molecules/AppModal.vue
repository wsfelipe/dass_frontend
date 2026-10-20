<script setup>
import { onMounted, onBeforeUnmount } from "vue";

defineProps({ open: Boolean, title: String, width: { type: String, default: "560px" } });
const emit = defineEmits(["close"]);

const onKey = (e) => e.key === "Escape" && emit("close");
onMounted(() => document.addEventListener("keydown", onKey));
onBeforeUnmount(() => document.removeEventListener("keydown", onKey));
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="overlay" @mousedown.self="emit('close')">
        <div class="modal" role="dialog" aria-modal="true" :style="{ maxWidth: width }">
          <header class="modal__head">
            <h3 v-html="title" />
            <button
              class="modal__close"
              type="button"
              aria-label="Fechar"
              @click="emit('close')"
            >
              ×
            </button>
          </header>
          <div class="modal__body"><slot /></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(13, 13, 13, 0.6);
  display: grid;
  place-items: center;
  padding: var(--space-4);
  z-index: 50;
}
.modal {
  width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  background: var(--color-surface);
  box-shadow: var(--shadow);
  border-top: 4px solid var(--color-accent);
}
.modal__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-5) var(--space-5) 0;
}
.modal__head h3 {
  font-size: 20px;
}
.modal__close {
  background: none;
  border: 0;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  color: var(--color-muted);
}
.modal__close:hover {
  color: var(--color-ink);
}
.modal__body {
  padding: var(--space-4) var(--space-5) var(--space-5);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
