import { useFetch } from "@vueuse/core";
import { defineStore } from "pinia";

const CONSTANTS = {
  LOCAL_STORAGE_KEY: "patchbay",
};

export const usePatchbayStore = defineStore("patchbay", {
  state: () => ({
    token: undefined,
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
    loadFromLocalStorage(key) {
      const item = localStorage.getItem(key);
      if (!item) {
        return undefined;
      } else {
        return JSON.parse(item);
      }
    },

    saveToLocalStorage(key, value) {
      const item = JSON.stringify(value);
      if (!item) {
        return undefined;
      } else {
        return localStorage.setItem(key, item);
      }
    },
    async sendSync(token, data) {
      let query = "";
      if (data) {
        query = `?${new URLSearchParams(Object.entries(data)).toString()}`;
      }
      return useFetch(`/api/cables/${token}${query}`).then(
        (result) => result?.data?.value && JSON.parse(result.data.value),
      );
    },
    async invoke(context, command, data, topicConfig) {
      return useFetch(`/api/cables/${context}/${command}`, {
        method: "POST",
        body: JSON.stringify({ data, topicConfig }),
      }).then((result) => result?.data?.value && JSON.parse(result.data.value));
    },
    loadSettingsFromLocalStorage() {
      const store = usePatchbayStore();
      const result = store.loadFromLocalStorage(CONSTANTS.LOCAL_STORAGE_KEY);

      this.token = result?.token;
    },
    login(token) {
      const store = usePatchbayStore();
      this.token = token;
      store.saveSettingsToLocalStorage();
    },
    async logout() {
      const store = usePatchbayStore();

      await useFetch(`/patchbay/auth/logout`, {
        method: "POST",
        body: JSON.stringify({
          mode: "session",
        }),
      }).then((result) => result?.data?.value && JSON.parse(result.data.value));
      this.token = null;
      store.saveToLocalStorage(CONSTANTS.LOCAL_STORAGE_KEY, {
        token: this.token,
      });
    },
    async refresh() {
      const store = usePatchbayStore();
      const { refresh_token } = await useFetch(`/patchbay/auth/refresh`, {
        method: "POST",
        body: JSON.stringify({
          refresh_token: this.token,
          mode: "cookie",
        }),
      }).then((result) => result?.data?.value && JSON.parse(result.data.value));
      store.login(refresh_token);
    },
    async init() {
      const store = usePatchbayStore();
      store.loadSettingsFromLocalStorage();
    },
  },
});
