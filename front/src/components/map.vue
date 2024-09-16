<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores/mainStore";

const store = useMainStore();
const cemeteries = await store.getApi("/cemetery");
const cemetery = store.getCemetery(cemeteries, store.user.cemetery_name);
const blocks = ref(cemetery[0].blocks);
const allPersons = await store.getApi("persons");
const activeCell = ref(null);
const emptyCellActive = ref(null);
const persons = allPersons.filter(
  (person) => person.cemetery_name == "new  Cemetery test"
);
console.log(persons);

const gridStyles = (block) => {
  return {
    gridTemplateColumns: `repeat(${block.columns}, 1fr)`,
    gridTemplateRows: `repeat(${block.rows}, 1fr)`,
  };
};

const getPersonStyle = (person) => {
  return {
    gridColumn: person.columns,
    gridRow: person.rows,
  };
};
const get = (e, index) => {
  localStorage.setItem("cellInfo", JSON.stringify(e));

  console.log(e);
  localStorage.setItem("index", JSON.stringify(index));
  window.dispatchEvent(new Event("storage")); // Trigger storage event manually

  if (e._id) {
    emptyCellActive.value = e.uniqueId;
    activeCell.value = null;
  } else {
    activeCell.value = e.uniqueId;
    emptyCellActive.value = null;
  }
};

// Create a grid with empty cells for each block
const grids = computed(() => {
  return blocks.value.map((block, blockIndex) => {
    const gridArray = Array.from(
      { length: block.rows * block.columns },
      (_, index) => {
        const row = Math.floor(index / block.columns) + 1;
        const column = (index % block.columns) + 1;
        const person = persons.find(
          (p) =>
            p.block === blockIndex + 1 && p.rows === row && p.columns === column
        );
        return (
          person || {
            rows: row,
            columns: column,
            block: blockIndex + 1,
            uniqueId: `${blockIndex + 1}-${row}-${column}`,
          }
        );
      }
    );
    return { block, gridArray };
  });
});
</script>

<template>
  <div class="">
    <div v-for="(grid, index) in grids" :key="index" class="block-container">
      <h3>Block {{ index + 1 }}</h3>
      <div class="grid-container" :style="gridStyles(grid.block)">
        <div
          v-for="cell in grid.gridArray"
          :key="cell._id"
          :style="getPersonStyle(cell)"
          :class="{
            'grid-item': true,
            active: activeCell === cell.uniqueId,
            'not-empty': emptyCellActive === cell.uniqueId,
          }"
          @click="get(cell, index + 1)"
        >
          {{ cell.name || "+" }} {{ cell?.number }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block-container {
  margin-bottom: 20px;
}
.grid-container {
  display: grid;
  gap: 10px;
  border: 1px solid #ccc;
}
.grid-item {
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
}
.active {
  background-color: var(--vt-c-primary);
}
.not-empty {
  color: #fff;
  background-color: red;
}
</style>
