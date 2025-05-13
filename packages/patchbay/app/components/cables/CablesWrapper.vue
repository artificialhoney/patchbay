<script setup lang="js">
import "@cables/ui/src/web/CablesWebComponent.js";
import CablesPatchbay from "@patchbay/client";
import { useTemplateRef, onMounted } from "vue";
import { EventEmitter } from "eventemitter3";

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

let cablesPatchbay = null;

const talker = new (class extends EventEmitter {
  send(event, data, callback) {
    switch (event) {
      case "requestPatchData":
        callback(null, cablesPatchbay.editor.config);
        return;
      case "getOpDocsAll":
        callback(null, []);
        return;
    }
  }
})();

if (process.client) {
  onMounted(async () => {
    cablesPatchbay = new CablesPatchbay(patchbay, talker, cablesUi.value);
    await cablesPatchbay.init();
  });
}
</script>

<template>
  <div class="flex">
    <cables-ui ref="cables-ui" :talker="talker"></cables-ui>
  </div>
</template>
