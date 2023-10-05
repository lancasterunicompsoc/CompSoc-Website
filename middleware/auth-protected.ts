import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(to => {
  const authstore = useAuthStore();
  const {
    public: { loginUrl },
  } = useRuntimeConfig();

  if (authstore.isExpired) {
    return navigateTo(loginUrl, { external: true });
  }
});
