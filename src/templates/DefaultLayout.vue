<script setup>
import AppHeader from "@/components/organisms/AppHeader.vue";
import ToastContainer from "@/components/organisms/ToastContainer.vue";
</script>

<template>
  <AppHeader />
  <main class="container main"><slot /></main>
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
</style>
