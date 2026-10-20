<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  options: { type: Array, required: true },
  placeholder: { type: String, default: "Selecione" },
  id: String,
  invalid: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const open = ref(false);
const root = ref(null);

function onClickOutside(e) {
  if (!root.value) return;
  const clickedThis = root.value.contains(e.target);
  if (clickedThis) return;
  open.value = false; 
}

onMounted(() => document.addEventListener('click', onClickOutside, true));
onUnmounted(() => document.removeEventListener('click', onClickOutside, true));

const selectedLabels = computed(() => {
  return props.options
    .filter((o) => props.modelValue.includes(o.value))
    .map((o) => o.label)
    .join(", ") || props.placeholder;
});

function toggle(value) {
  const current = [...props.modelValue];
  const idx = current.indexOf(value);
  if (idx > -1) current.splice(idx, 1);
  else current.push(value);
  emit("update:modelValue", current);
}

function isChecked(value) {
  return props.modelValue.includes(value);
}
</script>

<template>
  <div ref="root" class="multi-select" :class="{ 'multi-select--invalid': invalid }">
    <button
      :id="id"
      type="button"
      class="multi-select__trigger"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="multi-select__text">{{ selectedLabels }}</span>
      <span class="multi-select__arrow" :class="{ open }">▼</span>
    </button>
    <div v-show="open" class="multi-select__dropdown">
      <label
        v-for="o in options"
        :key="o.value"
        class="multi-select__item"
      >
        <input
          type="checkbox"
          :value="o.value"
          :checked="isChecked(o.value)"
          @change="toggle(o.value)"
        />
        <span>{{ o.label }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.multi-select {
  position: relative;
  width: 100%;
}
.multi-select__trigger {
  width: 100%;
  padding: 11px 12px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  font-size: inherit;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.multi-select__trigger:hover {
  border-color: #c9ccd1;
}
.multi-select__arrow {
  font-size: 10px;
  transition: transform 0.2s;
}
.multi-select__arrow.open {
  transform: rotate(180deg);
}
.multi-select--invalid .multi-select__trigger {
  border-color: var(--color-danger);
}
.multi-select__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 250px;
  overflow-y: auto;
  padding: 4px 0;
}
.multi-select__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
}
.multi-select__item:hover {
  background: var(--color-hover, #f3f4f6);
}
.multi-select__item input {
  accent-color: var(--color-ink);
}
</style>
