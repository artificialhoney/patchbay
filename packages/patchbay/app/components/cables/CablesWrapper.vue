<script setup lang="js">
import { usePatchbayStore } from "@/stores/patchbay";
import CablesPatchbay from "@patchbay/client";
import { useTemplateRef, onMounted } from "vue";

const props = defineProps({
  settings: {
    type: Object,
  },
});

if (process.client) {
  const DEFAULT_SETTINGS = {
    isTrustedPatch: true,
    platformClass: "PlatformPatchbay",
    urlCables: window.location.protocol + "//" + window.location.host,
    urlSandbox: window.location.protocol + "//" + window.location.host,
    communityUrl: "https://cables.gl",
    user: undefined,
    usersettings: { settings: undefined },
    isDevEnv: process.env.NODE_ENV !== "production",
    env: "patchbay",
    patchVersion: "",
    socketcluster: {},
    remoteClient: false,
    buildInfo: undefined,
    patchConfig: {
      allowEdit: false,
    },
    uiIndexHtml: "/cables/ui/index.html",
  };

  const settings = Object.assign(DEFAULT_SETTINGS, props.settings);

  const cablesUi = useTemplateRef("cables-ui");
  const { cablesGet, cablesRun } = usePatchbayStore();

  onMounted(async () => {
    const cablesPatchbay = new CablesPatchbay(
      {
        ipcRenderer: {
          sendSync: cablesGet,
          invoke: cablesRun,
        },
      },
      cablesUi.value,
      settings,
    );
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
