<script setup lang="js">
const route = useRoute();
definePageMeta({
  layout: "app",
  middleware: ["auth"],
});
</script>

<template>
  <CablesWrapper :settings="{ patchId: route.params.id }"></CablesWrapper>
</template>
