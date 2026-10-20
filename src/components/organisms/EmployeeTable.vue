<script setup>
import AppTable from "@/components/atoms/AppTable.vue";
import AppBadge from "@/components/atoms/AppBadge.vue";
import AppButton from "@/components/atoms/AppButton.vue";
import { maskCpf } from "@/utils/validators";
import { ref, computed } from "vue";

defineProps({ items: Array, loading: Boolean, hasFilters: Boolean });
const emit = defineEmits(["edit", "delete", "sort"]);

const columns = [
  { key: "cpf", label: "CPF", sortable: true },
  { key: "name", label: "Nome", sortable: true },
  { key: "email", label: "E-mail", sortable: true },
  { key: "shirtSize", label: "Camiseta", align: "center", sortable: true },
  { key: "shoeSize", label: "Calçado", align: "center", sortable: true },
  { key: "actions", label: "Ações", align: "right" },
];

const sortKey = ref(null);
const sortDir = ref("asc");

function handleSort(key) {
  const current = sortKey.value;
  const same = current === key;
  let newKey = current;
  let newDir = sortDir.value;

  if (same) {
    if (sortDir.value === "asc") {
      newDir = "desc";
    } else {
      newKey = null;
      newDir = "asc";
    }
  } else {
    newKey = key;
    newDir = "asc";
  }

  sortKey.value = newKey;
  sortDir.value = newDir;
  emit("sort", { key: newKey, dir: newKey ? newDir : null });
}
</script>

<template>
  <AppTable
    :columns="columns"
    :rows="items"
    :loading="loading"
    :sort-key="sortKey"
    :sort-dir="sortDir"
    @sort="handleSort"
    :empty-text="
      hasFilters
        ? 'Nenhum funcionário corresponde à pesquisa.'
        : 'Nenhum funcionário cadastrado ainda.'
    "
  >
    <template #cell-cpf="{ value }">{{ maskCpf(value) }}</template>
    <template #cell-shirtSize="{ value }"
      ><AppBadge>{{ value }}</AppBadge></template
    >
    <template #cell-actions="{ row }">
      <div class="actions">
        <AppButton variant="secondary" size="sm" @click="$emit('edit', row)"
          >Editar</AppButton
        >
        <AppButton variant="ghost" size="sm" @click="$emit('delete', row)"
          >Excluir</AppButton
        >
      </div>
    </template>
  </AppTable>
</template>

<style scoped>
.actions {
  display: inline-flex;
  gap: var(--space-2);
}
</style>
