<script setup lang="js">
const route = useRoute();
definePageMeta({
  layout: "empty",
});
</script>

<template>
  <CablesWrapper :settings="{ patchId: route.params.id }"></CablesWrapper>
</template>
