<script setup lang="js">
import { usePatchbayStore } from "../stores/patchbay";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

import Hero from "@/components/blocks/hero/Hero.vue";

const store = usePatchbayStore();
const { project } = storeToRefs(store);

const buttons = {
  primary: { text: t("patch.patch"), url: "/patch" },
  secondary: { text: t("patch.admin"), url: "/patchbay/admin" },
};

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div>
    <Hero
      v-if="project"
      :logo="project.logo"
      :heading="project.name"
      :description="project.description"
      :buttons="buttons"
    ></Hero>
  </div>
</template>
