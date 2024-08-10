<script setup>
import registerPerson from "../../components/registerPerson.vue";
import PersonsList from "../../components/map.vue";
</script>

<template>
  <div>
    <div class="title title-center">Maximus</div>
    <register-person />
    <Suspense>
      <persons-list />
    </Suspense>
  </div>
</template>

<style scoped></style>
