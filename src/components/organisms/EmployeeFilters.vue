<script setup>
import FormField from "@/components/molecules/FormField.vue";
import AppInput from "@/components/atoms/AppInput.vue";
import AppSelect from "@/components/atoms/AppSelect.vue";
import AppButton from "@/components/atoms/AppButton.vue";
import AppMultiSelect from "@/components/atoms/AppMultiSelect.vue";
import { SHIRT_OPTIONS, SHOE_MIN, SHOE_MAX } from "@/utils/constants";
import { maskCpf } from "@/utils/validators";

const shoeOptions = Array.from({ length: SHOE_MAX - SHOE_MIN + 1 }, (_, i) => ({
  value: String(SHOE_MIN + i),
  label: String(SHOE_MIN + i),
}));
const props = defineProps({ filters: { type: Object, required: true } });
const emit = defineEmits(["clear"]);
const hasFilters = () =>
  Object.values(props.filters).some((v) => (Array.isArray(v) ? v.length > 0 : v !== ""));
</script>

<template>
  <form class="filters" @submit.prevent>
    <FormField label="CPF" for="f-cpf">
      <AppInput
        id="f-cpf"
        :model-value="filters.cpf"
        placeholder="000.000.000-00"
        inputmode="numeric"
        @update:model-value="filters.cpf = maskCpf($event)"
      />
    </FormField>
    <FormField label="Nome" for="f-name">
      <AppInput id="f-name" v-model="filters.name" placeholder="Buscar por nome" />
    </FormField>
    <FormField label="E-mail" for="f-email">
      <AppInput id="f-email" v-model="filters.email" placeholder="Buscar por e-mail" />
    </FormField>
    <FormField label="Camiseta" for="f-shirt">
      <AppMultiSelect
        id="f-shirt"
        v-model="filters.shirtSize"
        :options="SHIRT_OPTIONS"
        placeholder="Todas"
      />
    </FormField>
    <FormField label="Calçado" for="f-shoe">
      <AppMultiSelect
        id="f-shoe"
        v-model="filters.shoeSize"
        :options="shoeOptions"
        placeholder="Todos"
      />
    </FormField>
    <AppButton variant="ghost" @click="$emit('clear')">Limpar</AppButton>
  </form>
</template>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: 1.2fr 1.6fr 1.6fr 1fr 1fr auto;
  gap: var(--space-4);
  align-items: end;
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  margin-bottom: var(--space-5);
}
@media (max-width: 1000px) {
  .filters {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .filters {
    grid-template-columns: 1fr;
  }
}
</style>
