import { generateTheme } from "@/lib/theme";
import { useFetch } from "@vueuse/core";
import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const usePatchbayStore = defineStore("patchbay", {
  state: () => ({
    token: undefined,
    info: undefined,
    settings: undefined,
    user: undefined,
    project: undefined,
    cables: {
      platform: undefined,
      config: undefined,
      docs: undefined,
      ops: undefined,
      patch: undefined,
    },
    theme: undefined,
  }),
  getters: {
    loggedIn: (state) => !!state.token,
  },
  actions: {
    async cablesGet(token, data) {
      let query = "";
      if (data) {
        query = `?${new URLSearchParams(Object.entries(data)).toString()}`;
      }
      return useFetch(`/api/cables/${token}${query}`).then(
        (result) => result?.data?.value && JSON.parse(result.data.value),
      );
    },
    async cablesRun(context, command, data, topicConfig) {
      return useFetch(`/api/cables/${context}/${command}`, {
        method: "POST",
        body: JSON.stringify({ data, topicConfig }),
      }).then((result) => result?.data?.value && JSON.parse(result.data.value));
    },
    async directusInfo() {
      return useFetch(`/patchbay/server/info`)
        .then((result) => result?.data?.value && JSON.parse(result.data.value))
        .then((data) => (this.info = data?.data));
    },
    async directusSettings() {
      return useFetch(`/patchbay/settings`)
        .then((result) => result?.data?.value && JSON.parse(result.data.value))
        .then((data) => (this.settings = data?.data));
    },
    async directusUser() {
      return useFetch(`/patchbay/users/me?fields[]=*&fields[]=role.id`)
        .then((result) => result?.data?.value && JSON.parse(result.data.value))
        .then((data) => (this.user = data?.data));
    },
    async init() {
      const store = usePatchbayStore();
      const { t } = useI18n({ useScope: "global" });

      await store.directusInfo();

      if (store.loggedIn) {
        await store.directusUser();
      }

      this.project = {
        name: store.info?.project.project_name || t("patchbay.title"),
        description:
          store.info?.project.project_descriptor || t("patchbay.description"),
        logo:
          (store.info?.project.project_logo &&
            `/patchbay/assets/${store.info?.project.project_logo}`) ||
          t("patchbay.logo"),
        color: store.info?.project.project_color || t("patchbay.color"),
      };

      this.theme = generateTheme(
        store.info?.project.project_color || t("patchbay.color"),
        true,
      );
    },
  },
});
