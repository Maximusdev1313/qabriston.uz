<script setup>
import { ref } from "vue";
import maps from "../components/map.vue";
</script>

<template>
  <main>
    <Suspense>
      <maps />
    </Suspense>
  </main>
</template>
