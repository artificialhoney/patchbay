import { navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== "/welcome" && to.path !== "/api/admin") {
    // setting the redirect code to '301 Moved Permanently'
    return navigateTo("/welcome", { redirectCode: 301 });
  }
});
