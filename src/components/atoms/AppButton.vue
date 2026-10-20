<script setup>
defineProps({
  variant: { type: String, default: "primary" },
  size: { type: String, default: "md" },
  type: { type: String, default: "button" },
  loading: Boolean,
  disabled: Boolean,
});
</script>

<template>
  <button
    :type="type"
    :class="['btn', `btn--${variant}`, `btn--${size}`]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="btn__spin" aria-hidden="true" />
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: 1px solid transparent;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.btn--md {
  padding: 12px 22px;
  font-size: 13px;
}
.btn--sm {
  padding: 6px 12px;
  font-size: 12px;
}
.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.btn--primary {
  background: var(--color-ink);
  color: #fff;
}
.btn--primary:hover:not(:disabled) {
  background: var(--color-accent);
}
.btn--secondary {
  background: transparent;
  color: var(--color-ink);
  border-color: var(--color-ink);
}
.btn--secondary:hover:not(:disabled) {
  background: var(--color-ink);
  color: #fff;
}
.btn--danger {
  background: var(--color-danger);
  color: #fff;
}
.btn--danger:hover:not(:disabled) {
  background: #7f1d1d;
}
.btn--ghost {
  background: transparent;
  color: var(--color-muted);
}
.btn--ghost:hover:not(:disabled) {
  color: var(--color-ink);
  background: var(--color-bg);
}
.btn__spin {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
