<script setup>
import AppButton from "@/components/atoms/AppButton.vue";

function goHome() {
  window.location.href = '/';
}
</script>

<template>
  <section class="not-found">
    <div class="not-found__content">
      <h1 class="not-found__title">404</h1>
      <p class="not-found__text">Página não encontrada</p>
      <AppButton @click="goHome">Voltar para página inicial</AppButton>
    </div>
  </section>
</template>

<style>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6) var(--space-5);
  min-height: calc(100vh - 140px);
}
.not-found__content {
  text-align: center;
}
.not-found__title {
  font-size: 120px;
  line-height: 1;
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.04em;
  margin: 0 0 var(--space-3) 0;
}
.not-found__text {
  font-size: 18px;
  color: var(--color-muted);
  margin: 0 0 var(--space-6) 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>
