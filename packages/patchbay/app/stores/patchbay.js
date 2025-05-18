import { useFetch } from "@vueuse/core";
import { defineStore } from "pinia";

const CONSTANTS = {
  LOCAL_STORAGE_KEY: "patchbay",
};

const loadFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  if (!item) {
    return undefined;
  } else {
    return JSON.parse(item);
  }
};

const saveToLocalStorage = (key, value) => {
  const item = JSON.stringify(value);
  if (!item) {
    return undefined;
  } else {
    return localStorage.setItem(key, item);
  }
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
  actions: {
    async sendSync(token, data) {
      let query = "";
      if (data) {
        query = `?${new URLSearchParams(Object.entries(data)).toString()}`;
      }
      return useFetch(`/api/cables/${token}${query}`).then(
        (result) => result.data.value && JSON.parse(result.data.value),
      );
    },
    async invoke(context, command, data, topicConfig) {
      return useFetch(`/api/cables/${context}/${command}`, {
        method: "POST",
        body: JSON.stringify({ data, topicConfig }),
      }).then((result) => result.data.value && JSON.parse(result.data.value));
    },
    loadSettingsFromLocalStorage() {
      const { token } = loadFromLocalStorage(CONSTANTS.LOCAL_STORAGE_KEY);
      this.token = token;
    },
    saveSettingsToLocalStorage() {
      saveToLocalStorage(CONSTANTS.LOCAL_STORAGE_KEY, { token: this.token });
    },
    login(token) {
      this.token = token;
      this.saveSettingsToLocalStorage();
    },
    logout() {
      this.token = null;
      this.saveSettingsToLocalStorage();
    },
    isLoggedIn() {
      return !!this.token;
    },
  },
});
