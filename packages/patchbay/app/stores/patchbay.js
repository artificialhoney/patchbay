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

export const useFreeboardStore = defineStore("patchbay", {
  state: () => ({
    token: null,
  }),
  actions: {
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
