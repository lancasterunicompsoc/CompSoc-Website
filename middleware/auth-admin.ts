import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(to => {
  const { isExpired, isAdmin } = storeToRefs(useAuthStore());
  const {
    public: { loginUrl },
  } = useRuntimeConfig();

  if (isExpired) {
    return navigateTo(loginUrl, { external: true });
  }

  if (!isAdmin) {
    return navigateTo("/");
  }
});
