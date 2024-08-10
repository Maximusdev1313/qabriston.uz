<script setup>
import { ref } from "vue";
import { useMainStore } from "../stores/mainStore";

const store = useMainStore();

const persons = await store.getApi("/persons");
console.log(persons);
const items = ref([
  { id: 1, col: 1, row: 1, content: "Product 1" },
  { id: 2, col: 1, row: 2, content: "Product 2" },
  // Add more items as needed
]);
</script>

<template>
  <div class="grid-container">
    <div
      v-for="item in items"
      :key="item.id"
      class="grid-item"
      :style="{ gridColumn: item.col, gridRow: item.row }"
    >
      {{ item.id }}
      {{ item.content }}
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Adjust the number of columns */
  gap: 10px;
}
.grid-item {
  border: 1px solid #ccc;

  padding: 20px;
  text-align: center;
}
</style>
