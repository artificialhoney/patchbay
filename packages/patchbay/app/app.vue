<script setup lang="js">
import { storeToRefs } from "pinia";
import { usePatchbayStore } from "./stores/patchbay";

const store = usePatchbayStore();
const { token, theme } = storeToRefs(store);

if (process.server) {
  const cookieToken = useCookie("directus_session_token");

  token.value = cookieToken.value;
}

onMounted(async () => {
  await store.init();

  useHead({
    style: [
      {
        children: `:root {
      ${theme.value.map(([k, v]) => "--" + k + ": " + v + ";").join("\n")}
    }`,
      },
    ],
  });
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
