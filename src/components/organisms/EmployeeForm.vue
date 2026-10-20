<script setup>
import { reactive, ref, watch } from "vue";
import FormField from "@/components/molecules/FormField.vue";
import AppInput from "@/components/atoms/AppInput.vue";
import AppSelect from "@/components/atoms/AppSelect.vue";
import AppButton from "@/components/atoms/AppButton.vue";
import { SHIRT_OPTIONS, SHOE_MIN, SHOE_MAX } from "@/utils/constants";
import { maskCpf, onlyDigits, validateEmployee } from "@/utils/validators";

const shoeOptions = Array.from({ length: SHOE_MAX - SHOE_MIN + 1 }, (_, i) => ({
  value: String(SHOE_MIN + i),
  label: String(SHOE_MIN + i),
}));
const props = defineProps({
  employee: { type: Object, default: null },
  saving: Boolean,
  serverErrors: { type: Object, default: () => ({}) },
});
const emit = defineEmits(["submit", "cancel"]);

const blank = () => ({ cpf: "", name: "", email: "", shirtSize: "", shoeSize: "" });
const form = reactive(blank());
const errors = ref({});

watch(
  () => props.employee,
  (e) => {
    Object.assign(
      form,
      blank(),
      e ? { ...e, cpf: maskCpf(e.cpf), shoeSize: String(e.shoeSize) } : {}
    );
    errors.value = {};
  },
  { immediate: true }
);
watch(
  () => props.serverErrors,
  (s) => (errors.value = { ...errors.value, ...s })
);

function submit() {
  errors.value = validateEmployee(form);
  if (Object.keys(errors.value).length) return;
  emit("submit", {
    cpf: onlyDigits(form.cpf),
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    shirtSize: form.shirtSize,
    shoeSize: form.shoeSize ? Number(form.shoeSize) : "",
  });
}
</script>

<template>
  <form class="form" novalidate @submit.prevent="submit">
    <FormField label="CPF" for="cpf" :error="errors.cpf" required>
      <AppInput
        id="cpf"
        :model-value="form.cpf"
        :invalid="!!errors.cpf"
        placeholder="000.000.000-00"
        inputmode="numeric"
        @update:model-value="form.cpf = maskCpf($event)"
      />
    </FormField>
    <FormField label="Nome do funcionário" for="name" :error="errors.name" required>
      <AppInput
        id="name"
        v-model="form.name"
        :invalid="!!errors.name"
        placeholder="Nome completo"
      />
    </FormField>
    <FormField label="E-mail" for="email" :error="errors.email" required>
      <AppInput
        id="email"
        v-model="form.email"
        type="email"
        :invalid="!!errors.email"
        placeholder="nome@empresa.com"
      />
    </FormField>
    <div class="form__row">
      <FormField
        label="Tamanho da camiseta"
        for="shirt"
        :error="errors.shirtSize"
        required
      >
        <AppSelect
          id="shirt"
          v-model="form.shirtSize"
          :options="SHIRT_OPTIONS"
          :invalid="!!errors.shirtSize"
        />
      </FormField>
      <FormField label="Tamanho do calçado" for="shoe" :error="errors.shoeSize" required>
        <AppSelect
          id="shoe"
          v-model="form.shoeSize"
          :options="shoeOptions"
          :invalid="!!errors.shoeSize"
        />
      </FormField>
    </div>
    <div class="form__actions">
      <AppButton variant="ghost" @click="emit('cancel')">Cancelar</AppButton>
      <AppButton type="submit" :loading="saving">{{
        employee ? "Salvar alterações" : "Cadastrar"
      }}</AppButton>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}
.form__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
@media (max-width: 480px) {
  .form__row {
    grid-template-columns: 1fr;
  }
}
</style>
