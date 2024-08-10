<script setup></script>

<template>
  <div class="container">
    <div class="card">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.container {
  position: absolute;
  width: 100% !important;
  height: 100vh;
  top: 0;

  background-color: var(--vt-c-divider-dark-1);
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: dialog;
  animation-duration: 0.5s;
}
.card {
  width: 90%;
  height: auto;
  z-index: 50;
  background-color: var(--vt-c-black-soft);
  border-radius: 15px;
  animation-name: dialog;
  animation-duration: 0.2s;
}
@keyframes dialog {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
