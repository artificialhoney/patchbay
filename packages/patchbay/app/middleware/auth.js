import { usePatchbayStore } from "@/stores/patchbay";

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = usePatchbayStore();

  if (!loggedIn) {
    return navigateTo("/patchbay/admin/login");
  }
});
