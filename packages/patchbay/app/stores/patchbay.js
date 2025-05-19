import { useFetch } from "@vueuse/core";
import { defineStore } from "pinia";

export const usePatchbayStore = defineStore("patchbay", {
  state: () => ({
    token: undefined,
    settings: undefined,
    user: undefined,
    cables: {
      platform: undefined,
      config: undefined,
      docs: undefined,
      ops: undefined,
      patch: undefined,
    },
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
    async directusSettings() {
      return useFetch(`/patchbay/settings`)
        .then((result) => result?.data?.value && JSON.parse(result.data.value))
        .then((data) => (this.settings = data));
    },
    async directusUser() {
      return useFetch(`/patchbay/users/me?fields[]=*&fields[]=role.id`)
        .then((result) => result?.data?.value && JSON.parse(result.data.value))
        .then((data) => (this.user = data));
    },
    async init() {
      const store = usePatchbayStore();
      if (store.loggedIn) {
        await store.directusUser();
      }
    },
  },
});
