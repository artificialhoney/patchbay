<script setup lang="js">
import { storeToRefs } from "pinia";
import { usePatchbayStore } from "./stores/patchbay";

const cookieToken = useCookie("directus_session_token");
const store = usePatchbayStore();
const { token } = storeToRefs(store);

token.value = cookieToken.value;

onMounted(async () => {
  await store.init();
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
