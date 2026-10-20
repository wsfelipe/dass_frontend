<script setup>
import { reactive, ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import AppButton from "@/components/atoms/AppButton.vue";
import AppDivider from "@/components/atoms/AppDivider.vue";
import AppModal from "@/components/molecules/AppModal.vue";
import AppPagination from "@/components/molecules/AppPagination.vue";
import EmployeeFilters from "@/components/organisms/EmployeeFilters.vue";
import EmployeeTable from "@/components/organisms/EmployeeTable.vue";
import EmployeeForm from "@/components/organisms/EmployeeForm.vue";
import ConfirmDialog from "@/components/organisms/ConfirmDialog.vue";
import { useEmployeesStore } from "@/stores/employees";
import { storeToRefs } from "pinia";
import { useToastStore } from "@/stores/toast";
import { useDebounceFn } from "@/utils/debounce";
import { employeeService } from "@/services/employeeService";
import { onlyDigits } from "@/utils/validators";

const LIMIT = 10;
const toast = useToastStore();
const employeesStore = useEmployeesStore();
const { items, meta, loading, error } = storeToRefs(employeesStore);
const fetchList = employeesStore.fetchList;

const emptyFilters = () => ({
  cpf: "",
  name: "",
  email: "",
  shirtSize: [],
  shoeSize: [],
});
const filters = reactive(emptyFilters());
const page = ref(1);
const sortCol = ref(null);
const sortDir = ref("asc");
const hasFilters = computed(() =>
  Object.entries(filters).some(([k, v]) => {
    if (Array.isArray(v)) return v.length > 0;
    return v !== "";
  })
);

function onTableSort({ key, dir }) {
  console.log('SORT EVENT', key, dir);
  if (key) {
    sortCol.value = key;
    sortDir.value = dir || 'asc';
  } else {
    sortCol.value = null;
    sortDir.value = 'asc';
  }
  load();
}

function load() {
  const payload = {
    page: page.value,
    limit: LIMIT,
    cpf: onlyDigits(filters.cpf),
    name: filters.name.trim(),
    email: filters.email.trim(),
    shirtSize: Array.isArray(filters.shirtSize) ? filters.shirtSize : (filters.shirtSize ? [filters.shirtSize] : []),
    shoeSize: Array.isArray(filters.shoeSize) ? filters.shoeSize : (filters.shoeSize ? [filters.shoeSize] : []),
    sort: sortCol.value || undefined,
    order: sortCol.value ? sortDir.value || undefined : undefined,
  };
  console.log("[load] payload:", JSON.stringify(payload));
  fetchList(payload);
}

const applyFilters = useDebounceFn(() => {
  if (page.value !== 1) page.value = 1;
  else load();
}, 400);

watch(filters, applyFilters);
watch(page, load);
onMounted(load);
onBeforeUnmount(() => applyFilters.cancel());

const clearFilters = () => Object.assign(filters, emptyFilters());

const formOpen = ref(false);
const editing = ref(null);
const saving = ref(false);
const serverErrors = ref({});

function openForm(employee = null) {
  editing.value = employee;
  serverErrors.value = {};
  formOpen.value = true;
}

function mapServerErrors(e) {
  const out = {};
  (e.errors || []).forEach((it) => {
    const field = it.field || it.path || it.param;
    if (field) out[field] = it.message || it.msg || "Valor inválido.";
  });
  return out;
}

async function save(payload) {
  if (saving.value) return;
  saving.value = true;
  serverErrors.value = {};
  try {
    if (editing.value) {
      await employeesStore.update(editing.value.id, payload);
      toast.success("Funcionário atualizado com sucesso.");
    } else {
      await employeesStore.create(payload);
      toast.success("Funcionário cadastrado com sucesso.");
    }
    formOpen.value = false;
    editing.value = null;
    load();
  } catch (e) {
    serverErrors.value = mapServerErrors(e);
    toast.error(
      e.status === 409 ? e.message || "CPF ou e-mail já cadastrado." : e.message
    );
  } finally {
    saving.value = false;
  }
}

const toDelete = ref(null);
const deleting = ref(false);

async function confirmDelete() {
  if (deleting.value) return;
  deleting.value = true;
  try {
    await employeesStore.remove(toDelete.value.id);
    toast.success("Funcionário excluído com sucesso.");
    toDelete.value = null;
    if (items.value.length === 1 && page.value > 1) page.value -= 1;
    else load();
  } catch (e) {
    toast.error(e.message);
  } finally {
    deleting.value = false;
  }
}
</script>

<template>
  <section>
    <div class="page-head">
      <div>
        <h1><strong>Funcionários</strong> cadastrados</h1>
        <AppDivider />
        <p class="page-head__sub">
          Tamanhos de camiseta e calçado para a distribuição de brindes.
        </p>
      </div>
      <AppButton @click="openForm()">+ Novo funcionário</AppButton>
    </div>

    <EmployeeFilters :filters="filters" @clear="clearFilters" />

    <p v-if="error" class="error" role="alert">
      {{ error }}
      <AppButton variant="secondary" size="sm" @click="load">Tentar novamente</AppButton>
    </p>

    <EmployeeTable
      :items="items"
      :loading="loading"
      @sort="onTableSort"
      :has-filters="hasFilters"
      @edit="openForm"
      @delete="toDelete = $event"
    />
    <AppPagination
      :page="page"
      :total-pages="meta.totalPages"
      :total="meta.total"
      @change="page = $event"
    />

    <AppModal
      :open="formOpen"
      :title="
        editing
          ? '<strong>Editar</strong> funcionário'
          : '<strong>Novo</strong> funcionário'
      "
      @close="formOpen = false"
    >
      <EmployeeForm
        :employee="editing"
        :saving="saving"
        :server-errors="serverErrors"
        @submit="save"
        @cancel="formOpen = false"
      />
    </AppModal>

    <ConfirmDialog
      :open="!!toDelete"
      :loading="deleting"
      confirm-text="Excluir"
      :message="`Deseja realmente excluir ${toDelete?.name}? Esta ação não pode ser desfeita.`"
      title="<strong>Excluir</strong> funcionário"
      @confirm="confirmDelete"
      @cancel="toDelete = null"
    />
  </section>
</template>

<style scoped>
.page-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-5);
}
.page-head h1 {
  font-size: 28px;
}
.page-head__sub {
  margin: 0;
  color: var(--color-muted);
}
.error {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: #fef2f2;
  color: var(--color-danger);
  border-left: 4px solid var(--color-danger);
}
</style>
