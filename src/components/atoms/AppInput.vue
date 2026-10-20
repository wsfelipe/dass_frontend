<script setup>
const props = defineProps({
  modelValue: { type: [String, Number, Array], default: () => [] },
  id: String,
  type: { type: String, default: "text" },
  placeholder: String,
  invalid: Boolean,
  inputmode: String,
  maxlength: [String, Number],
  min: [String, Number],
  max: [String, Number],
  multiple: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

function onInput(e) {
  if (props.multiple) {
    const val = e.target.value;
    const current = Array.isArray(props.modelValue) ? props.modelValue : [];
    if (current.includes(val)) {
      emit("update:modelValue", current.filter((v) => v !== val));
    } else {
      emit("update:modelValue", [...current, val]);
    }
    e.target.value = "";
  } else {
    emit("update:modelValue", e.target.value);
  }
}
</script>

<template>
  <input
    :id="id"
    :type="type"
    :value="multiple ? '' : modelValue"
    :placeholder="placeholder"
    :inputmode="inputmode"
    :maxlength="maxlength"
    :min="min"
    :max="max"
    :aria-invalid="invalid || undefined"
    :class="['input', { 'input--invalid': invalid }]"
    @input="onInput"
  />
</template>

<style scoped>
.input {
  width: 100%;
  padding: 11px 12px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  transition: border-color 0.15s;
}
.input:hover {
  border-color: #c9ccd1;
}
.input:focus {
  border-color: var(--color-ink);
  outline: none;
}
.input--invalid {
  border-color: var(--color-danger);
}
</style>
