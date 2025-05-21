<script setup lang="js">
import { storeToRefs } from "pinia";
import { usePatchbayStore } from "./stores/patchbay";
import { generateTheme } from "@/lib/theme";

const store = usePatchbayStore();
const { token, info, user, project, theme } = storeToRefs(store);
const { t } = useI18n({ useScope: "global" });

if (process.server) {
  const cookieToken = useCookie("directus_session_token");

  token.value = cookieToken.value;

  try {
    info.value = await store.directusInfo();

    if (store.loggedIn) {
      user.value = await store.directusUser();
    }

    const color = info.value.project_color || t("patchbay.color");
    const appearance =
      user.value?.appearance || info.value.default_appearance || "dark";

    project.value = {
      name: info.value.project_name || t("patchbay.title"),
      description: info.value.project_descriptor || t("patchbay.description"),
      logo:
        (info.value.project_logo &&
          `/patchbay/assets/${info.value.project_logo}`) ||
        t("patchbay.logo"),
      color,
      appearance,
    };

    theme.value = generateTheme(color, appearance === "dark");
  } catch (e) {
    // Handle error
    console.log(e);
  }
}

useHead({
  style: [
    {
      children: `:root {
      ${theme.value
        .map(([k, v]) => "--" + k + ": " + v + " !important;")
        .join("\n")}
    }`,
    },
  ],
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
