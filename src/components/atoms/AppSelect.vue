<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  options: { type: Array, required: true },
  placeholder: { type: String, default: "Selecione" },
  id: String,
  invalid: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const root = ref(null);

const selectedLabel = computed(() => {
  const opt = props.options.find((o) => o.value === props.modelValue);
  return opt ? opt.label : props.placeholder;
});

function onClickOutside(e) {
  if (!root.value) return;
  if (root.value.contains(e.target)) return;
  open.value = false;
}

onMounted(() => document.addEventListener("click", onClickOutside, true));
onUnmounted(() => document.removeEventListener("click", onClickOutside, true));
</script>

<template>
  <div ref="root" class="select-wrapper" :class="{ 'select--invalid': invalid }">
    <button
      type="button"
      :id="id"
      class="select-trigger"
      @click="open = !open"
      :aria-expanded="open"
    >
      <span class="select-trigger-text">{{ selectedLabel }}</span>
      <span class="select-arrow" :class="{ open }">▼</span>
    </button>
    <div v-show="open" class="select-dropdown">
      <label
        v-for="o in options"
        :key="o.value"
        class="select-item"
        @click="() => { emit('update:modelValue', o.value); open = false; }"
        :class="{ selected: modelValue === o.value }"
      >
        <span>{{ o.label }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.select-wrapper {
  position: relative;
  width: 100%;
}
.select-trigger {
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
.select-trigger:hover {
  border-color: #c9ccd1;
}
.select-trigger:focus {
  outline: none;
  border-color: var(--color-ink);
}
.select-trigger:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
}
.select-arrow {
  font-size: 10px;
  transition: transform 0.2s;
}
.select-arrow.open {
  transform: rotate(-180deg);
}
.select-trigger-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.select-dropdown {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  padding: 4px 0;
}
.select-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
}
.select-item:hover {
  background: var(--color-hover, #f3f4f6);
}
.select-item.selected {
  background: #e8eaf0;
  font-weight: 600;
}
.select-item input {
  accent-color: var(--color-ink);
  cursor: pointer;
}
</style>
