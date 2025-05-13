<script setup lang="js">
import "@cables/ui/src/web/CablesWebComponent.js";
import CablesPatchbay from "@patchbay/client";
import { useTemplateRef, onMounted } from "vue";

const { data: platformSettings } = await useFetch(
  "/api/cables/platformSettings",
);
const { data: cablesConfig } = await useFetch("/api/cables/cablesConfig");
const { data: getStartupLog } = await useFetch("/api/cables/getStartupLog");
const { data: getOpModuleDir } = await useFetch("/api/cables/getOpModuleDir");
const { data: getOpModuleLocation } = await useFetch(
  "api/cables/getOpModuleLocation",
);

const cablesUi = useTemplateRef("cables-ui");

const patchbay = {
  ipcRenderer: new (class {
    sendSync(token) {
      switch (token) {
        case "platformSettings":
          return platformSettings.value;
        case "cablesConfig":
          return cablesConfig.value;
        case "getStartupLog":
          return getStartupLog.value;
        case "getOpModuleDir":
          return getOpModuleDir.value;
        case "getOpModuleLocation":
          return getOpModuleLocation.value;
      }
    }
    invoke() {
      return Promise.resolve();
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
    <iframe ref="cables-ui" class="w-full h-full" />
  </div>
</template>
