<script setup lang="js">
import CablesPatchbay from "@patchbay/client";
import { useFetch } from "@vueuse/core";
import { useTemplateRef, onMounted } from "vue";

const cablesUi = useTemplateRef("cables-ui");

const patchbay = {
  ipcRenderer: new (class {
    async sendSync(token, data) {
      let query = "";
      if (data) {
        query = `?${new URLSearchParams(Object.entries(data)).toString()}`;
      }
      return await useFetch(`/api/cables/${token}${query}`).then(
        (result) => result.data.value && JSON.parse(result.data.value),
      );
    }
    invoke(context, command) {
      return useFetch(`/api/cables/${context}/${command}`).then(
        (result) => result.data.value && JSON.parse(result.data.value),
      );
    }
  })(),
};

let init = true;

if (process.client) {
  onMounted(async () => {
    const cablesPatchbay = new CablesPatchbay(patchbay, cablesUi.value);
    if (init) {
      await cablesPatchbay.init();
      init = false;
    }
  });
}
</script>

<template>
  <div class="flex h-full">
    <iframe
      ref="cables-ui"
      class="w-full h-full"
      allow="autoplay; camera; microphone"
    />
  </div>
</template>
