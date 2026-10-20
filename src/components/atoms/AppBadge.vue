<template>
  <span class="badge"><slot /></span>
</template>

<style scoped>
.badge {
  display: inline-block;
  min-width: 36px;
  text-align: center;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--color-ink);
  border: 1px solid var(--color-ink);
  border-radius: 999px;
}
</style>
