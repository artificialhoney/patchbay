<script setup lang="js">
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

import Hero from "@/components/blocks/hero/Hero.vue";
import Footer from "@/components/blocks/footer/Footer.vue";

const title = t("title");
const description = t("description");

const buttons = {
  primary: { text: t("patch"), url: "/patch" },
  secondary: { text: t("admin"), url: "/api/admin" },
};

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: "/icon/favicon.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <Hero
    logo
    :heading="title"
    :description="description"
    :buttons="buttons"
  ></Hero>
  <Footer></Footer>
</template>
