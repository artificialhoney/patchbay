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
    ready: (state) => !!state.project,
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
      return $fetch(`/patchbay/server/info`)
        .then((data) => data?.data?.project)
        .then((data) => {
          return (this.info = data);
        });
    },
    async directusUser() {
      return $fetch(
        `/patchbay/users/me?fields[]=*&fields[]=role.id&access_token=${this.token}`,
      )
        .then((data) => data?.data)
        .then((data) => {
          return (this.user = data);
        });
    },
  },
});
