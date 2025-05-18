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
      return useFetch(`/api/cables/${token}${query}`).then(
        (result) => result.data.value && JSON.parse(result.data.value),
      );
    }

    async invoke(context, command, data, topicConfig) {
      return useFetch(`/api/cables/${context}/${command}`, {
        method: "POST",
        body: { ...data, topicConfig },
      })
        .then((result) => result.data.value && JSON.parse(result.data.value))
        .then((data) => {
          if (this._callback) {
            this._callback({}, { cmd: command, data });
          }
          return data;
        });
    }

    onTalkerMessage(callback) {
      this._callback = callback;
    }
  })(),
};

if (process.client) {
  onMounted(async () => {
    const cablesPatchbay = new CablesPatchbay(patchbay, cablesUi.value);
    await cablesPatchbay.init();
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
