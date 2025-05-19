<script setup lang="js">
import { usePatchbayStore } from "./stores/patchbay";

if (process.client) {
  onMounted(async () => {
    const { init } = usePatchbayStore();

    await init();
  });
}
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
