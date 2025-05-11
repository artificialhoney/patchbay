<script setup lang="js">
import "@cables/ui/src/web/CablesWebComponent.js";

if (process.client) {
  await import("@cables/ui/src/libs/index.js");
}
</script>

<template>
  <div class="flex">
    <cables-ui></cables-ui>
  </div>
</template>
