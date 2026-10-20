<script setup>
import DefaultLayout from "@/templates/DefaultLayout.vue";
import EmployeesPage from "@/pages/EmployeesPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const isNotFound = window.location.pathname !== '/' && window.location.pathname !== '';
</script>

<template>
  <NotFoundPage v-if="isNotFound" />
  <DefaultLayout v-else>
    <EmployeesPage />
  </DefaultLayout>
</template>
