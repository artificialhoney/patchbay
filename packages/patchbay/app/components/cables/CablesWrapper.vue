<script setup lang="js">
import { TalkerAPI } from "@cables/client";
import { useTemplateRef, onMounted, onUnmounted } from "vue";

window.CABLES = Window.CABLES || {};

const talkerTopics = {
  requestPatchData: { needsProjectFile: true },
  getOpInfo: {},
  savePatch: { needsProjectFile: true },
  getPatch: {},
  newPatch: {},
  getAllProjectOps: {},
  getOpDocsAll: {},
  getOpDocs: {},
  saveOpCode: {},
  getOpCode: {},
  opAttachmentGet: {},
  formatOpCode: {},
  saveUserSettings: {},
  checkProjectUpdated: {},
  opAddLib: {},
  opAddCoreLib: {},
  opAttachmentAdd: {},
  opAttachmentDelete: {},
  opRemoveLib: {},
  opRemoveCoreLib: {},
  getChangelog: {},
  opAttachmentSave: {},
  setIconSaved: {},
  setIconUnsaved: {},
  saveScreenshot: {},
  getFilelist: {},
  getFileDetails: {},
  getLibraryFileInfo: {},
  checkOpName: {},
  getRecentPatches: {},
  opCreate: { needsProjectFile: true },
  opRename: {},
  opUpdate: {},
  opDelete: {},
  opClone: {},
  opSaveLayout: {},
  opSetSummary: {},
  checkNumAssetPatches: {},
  saveProjectAs: {},
  gotoPatch: {},
  getProjectOpDirs: {},
  openDir: {},
  selectFile: {},
  selectDir: {},
  setProjectName: { needsProjectFile: true },
  collectAssets: { needsProjectFile: true },
  collectOps: { needsProjectFile: true },
  getCollectionOpDocs: {},
  patchCreateBackup: { needsProjectFile: true },
  addOpDependency: {},
  removeOpDependency: {},
  saveProjectOpDirOrder: { needsProjectFile: true },
  removeProjectOpDir: { needsProjectFile: true },
  exportPatch: { needsProjectFile: true },
  exportPatchBundle: { needsProjectFile: true },
  addProjectOpDir: { needsProjectFile: true },
  uploadFileToOp: {},
  errorReport: {},
};

const props = defineProps({
  settings: {
    type: Object,
  },
});

if (process.client) {
  const DEFAULT_SETTINGS = {
    uiIndexHtml: "/cables/ui/index.html",
  };

  const settings = Object.assign(DEFAULT_SETTINGS, props.settings);
  const cablesUi = useTemplateRef("cables-ui");

  const receiveMessage = (event) => {
    console.log("Received message from Cables UI:", event);
  };

  onMounted(() => {
    cablesUi.value.src = settings.uiIndexHtml;

    const talker = new TalkerAPI(cablesUi.value.contentWindow);
    talker.logEvents(true, "Patchbay Cables UI");

    Object.keys(talkerTopics).forEach((talkerTopic) => {
      talker.on(talkerTopic, receiveMessage);
    });
  });

  onUnmounted(() => {
    window.removeEventListener("message", receiveMessage);
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
