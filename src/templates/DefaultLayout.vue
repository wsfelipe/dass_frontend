<script setup>
import AppHeader from "@/components/organisms/AppHeader.vue";
import ToastContainer from "@/components/organisms/ToastContainer.vue";
</script>

<template>
  <AppHeader />
  <main class="container main"><slot /></main>
  <footer class="footer">
    © {{ new Date().getFullYear() }} | Grupo Dass | Todos os direitos reservados.
  </footer>
  <ToastContainer />
</template>

<style>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-5);
}
</style>
<style scoped>
.main {
  padding-top: var(--space-6);
  padding-bottom: var(--space-7);
  min-height: calc(100vh - 140px);
}
.footer {
  padding: var(--space-5);
  text-align: center;
  font-size: 12px;
  color: var(--color-muted);
  border-top: 1px solid var(--color-line);
}
</style>
