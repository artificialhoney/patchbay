<script setup lang="js">
import { storeToRefs } from "pinia";
import { usePatchbayStore } from "./stores/patchbay";

const store = usePatchbayStore();

if (process.server) {
  const cookieToken = useCookie("directus_session_token");
  const { token } = storeToRefs(store);

  token.value = cookieToken.value;
}

onMounted(async () => {
  await store.init();
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
