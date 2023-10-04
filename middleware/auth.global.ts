import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async to => {
  const jwt = to.query.jwt;
  const authstore = useAuthStore();

  // After logging in from weblogin.lancs.ac.uk, they set the ?jwt=... url query
  // This only happens right after logging in
  if (typeof jwt === "string" && jwt.length > 0) {
    if (!process.server) {
      // @ts-ignore if we were to set it to null to satisfy TS, it would leave an empty ?jwt= in the URL
      to.query.jwt = undefined;

      // because this is basically the sign up process, we need to let the backed know that a new user has just 'signed up'
      try {
        const result = await $fetch(`/api/signup?jwt=${jwt}`);
        if (!result.ok) {
          console.error(`Error while signup: ${result}`);
        }
        authstore.setJWT(result.jwt);
      } catch (e) {
        console.error(e);
      }

      return navigateTo(to, { replace: true });
    }
  }
});
