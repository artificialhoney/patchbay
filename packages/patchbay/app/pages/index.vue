<script setup lang="js">
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

import Hero from "@/components/blocks/hero/Hero.vue";

const title = t("title");
const description = t("description");

const buttons = {
  primary: { text: t("patch"), url: "/patch" },
  secondary: { text: t("admin"), url: "/patchbay/admin" },
};

definePageMeta({
  layout: "default",
});
</script>

<template>
  <Hero
    logo
    :heading="title"
    :description="description"
    :buttons="buttons"
  ></Hero>
</template>
