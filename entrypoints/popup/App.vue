<script lang="ts" setup>
import Settings from "@/components/Settings.vue";
</script>

<template>
  <div style="display: flex; align-items: center">
    <img src="@/assets/icon.svg" class="logo" alt="Logo" />
    <h2 style="margin: 0">RazvitScript</h2>
  </div>
  <Settings />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em GreenYellow);
}
</style>
