<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const props = defineProps({
  type: { type: String, default: "info" },
  message: String,
  timeout: { type: Number, default: 4000 },
});
const emit = defineEmits(["close"]);
const progress = ref(100);
let start = Date.now();
let raf = null;
function tick() {
  const elapsed = Date.now() - start;
  const pct = Math.max(0, 100 - (elapsed / props.timeout) * 100);
  progress.value = pct;
  if (pct <= 0) {
    emit("close");
    return;
  }
  raf = requestAnimationFrame(tick);
}
onMounted(() => {
  raf = requestAnimationFrame(tick);
});
onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
});
</script>

<template>
  <div :class="['toast', `toast--${type}`]" role="status">
    <span>{{ message }}</span>
    <button type="button" class="toast__x" aria-label="Fechar" @click="$emit('close')">
      ×
    </button>
    <div class="toast__progress-bar" :style="{ width: progress + '%' }" />
  </div>
</template>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-width: 280px;
  max-width: 380px;
  padding: 14px 16px;
  background: var(--color-ink);
  color: #fff;
  border-left: none;
  box-shadow: var(--shadow);
  font-size: 14px;
  position: relative;
  overflow: hidden;
}
.toast--success {
  border-left-color: transparent;
}
.toast--error {
  border-left-color: transparent;
}
.toast__x {
  background: none;
  border: 0;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.7;
}
.toast__x:hover {
  opacity: 1;
}
.toast__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1));
  border-radius: 0 3px 3px 0;
  transition: width 60ms linear;
}
</style>
