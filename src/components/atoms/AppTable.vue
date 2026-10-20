<script setup>
import { ref } from "vue";

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  loading: Boolean,
  emptyText: { type: String, default: "Nenhum registro encontrado." },
  rowKey: { type: String, default: "id" },
  sortKey: { type: String, default: null },
  sortDir: { type: String, default: "asc" },
});

const emit = defineEmits(["sort"]);
const hoveredCol = ref(null);
const activeCol = ref(null);
</script>

<template>
  <div class="table-wrap" :aria-busy="loading">
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="c in columns"
            :key="c.key"
            :style="{ textAlign: c.align || 'left' }"
            :class="{
              'is-sortable': c.sortable,
              'is-active': props.sortKey === c.key,
              'is-hover': hoveredCol === c.key,
            }"
            @click="c.sortable && emit('sort', c.key)"
            @mouseenter="c.sortable && (hoveredCol = c.key)"
            @mouseleave="hoveredCol = null"
          >
            <span class="th-label">{{ c.label }}</span>
            <span
              v-if="c.sortable"
              class="arrow"
              :class="{
                asc: props.sortKey === c.key && props.sortDir === 'asc',
                desc: props.sortKey === c.key && props.sortDir === 'desc',
                visible: props.sortKey === c.key || hoveredCol === c.key,
              }"
              aria-hidden="true"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody :class="{ 'is-loading': loading }">
        <tr v-for="row in rows" :key="row[rowKey]">
          <td
            v-for="c in columns"
            :key="c.key"
            :style="{ textAlign: c.align || 'left' }"
            :data-label="c.label"
          >
            <slot :name="`cell-${c.key}`" :row="row" :value="row[c.key]">{{
              row[c.key]
            }}</slot>
          </td>
        </tr>
        <template v-if="loading && !rows.length">
          <tr v-for="_ in 3" :key="'_sk-' + _" class="is-skeleton">
            <td v-for="c in columns" :key="c.key"><span></span></td>
          </tr>
        </template>
        <tr v-if="!rows.length">
          <td :colspan="columns.length" class="table__empty">
            {{ loading ? "Carregando…" : emptyText }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrap {
  overflow-x: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
}
.table {
  width: 100%;
  border-collapse: collapse;
}
th {
  padding: 14px 16px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--color-ink);
  border-bottom: 2px solid var(--color-ink);
  white-space: nowrap;
  cursor: default;
  user-select: none;
  vertical-align: middle;
}
th.is-sortable {
  cursor: pointer;
}
.th-label {
  display: inline-block;
  vertical-align: middle;
}
.arrow {
  display: inline-block;
  margin-left: 4px;
  vertical-align: middle;
  margin-left: 4px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  opacity: 0;
  transition: opacity 0.15s;
}
.arrow.asc {
  border-bottom: 4px solid var(--color-ink);
  border-top: 0;
}
.arrow.desc {
  border-top: 4px solid var(--color-ink);
  border-bottom: 0;
}
.arrow.visible,
th.is-active .arrow,
th.is-hover .arrow {
  opacity: 1;
}
th.is-hover:not(.is-active) .arrow {
  opacity: 1;
}
th.is-hover:not(.is-active) .arrow.asc,
th.is-hover:not(.is-active) .arrow:not(.asc):not(.desc) {
  border-bottom-color: #ccc;
  border-top-color: transparent;
  border-top: 0;
  border-bottom: 4px solid #ccc;
}
th.is-hover:not(.is-active) .arrow.desc {
  border-top-color: #ccc;
  border-bottom-color: transparent;
  border-bottom: 0;
  border-top: 4px solid #ccc;
}
td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-line);
}
tbody tr:hover td {
  background: #fafafa;
}
.is-loading {
  opacity: 0.5;
  transition: opacity 0.15s;
}
.table__empty {
  text-align: center !important;
  color: var(--color-muted);
  padding: 40px 16px;
}
tbody tr.is-skeleton td {
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  height: 48px;
}
tbody tr.is-skeleton td span {
  display: block;
  height: 14px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.08);
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
@media (max-width: 720px) {
  thead {
    display: none;
  }
  tr {
    display: block;
    border-bottom: 2px solid var(--color-line);
    padding: 8px 0;
  }
  td {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    border: 0;
    padding: 6px 16px;
    text-align: right !important;
  }
  td::before {
    content: attr(data-label);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 11px;
    color: var(--color-muted);
    text-align: left;
  }
  .table__empty {
    display: block;
  }
  .table__empty::before {
    content: none;
  }
}
</style>
