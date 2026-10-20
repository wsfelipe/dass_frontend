<script setup>
defineProps({ label: String, for: String, error: String, required: Boolean });
</script>

<template>
  <div class="field">
    <label v-if="label" :for="$props.for" class="field__label"
      >{{ label }}<span v-if="required" class="field__req"> *</span></label
    >
    <slot />
    <p v-if="error" class="field__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field__label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-ink);
}
.field__req {
  color: var(--color-accent);
}
.field__error {
  margin: 0;
  font-size: 12px;
  color: var(--color-danger);
}
</style>
