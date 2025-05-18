<script setup lang="js">
const route = useRoute();
definePageMeta({
  layout: "app",
});
</script>

<template>
  <CablesWrapper :settings="{ patchId: route.params.id }"></CablesWrapper>
</template>
