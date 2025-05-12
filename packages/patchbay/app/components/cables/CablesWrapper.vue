<script setup lang="js">
import "@cables/ui/src/web/CablesWebComponent.js";
import CablesPatchbay from "@patchbay/client";
import { useTemplateRef, onMounted } from "vue";

const cablesUi = useTemplateRef("cables-ui");

const patchbay = {
  ipcRenderer: new (class {
    sendSync(token) {
      switch (token) {
        case "platformSettings":
          return {
            paths: [],
          };
        case "cablesConfig":
          return {};
        case "getStartupLog":
          return [];
        case "getOpModuleDir":
          return "";
        case "getOpModuleLocation":
          return "";
      }
    }
    invoke(token) {
      console.log(token);
    }
    on(token) {
      console.log(token);
    }
  })(),
};

const talker = new (class {
  on(token) {
    console.log(token);
  }
  addEventListener(token) {
    console.log(token);
  }
})();

if (process.client) {
  onMounted(async () => {
    const cablesPatchbay = new CablesPatchbay(patchbay, talker, cablesUi.value);
    await cablesPatchbay.init();
  });
}
</script>

<template>
  <div class="flex">
    <cables-ui ref="cables-ui"></cables-ui>
  </div>
</template>
