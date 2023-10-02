export default defineNuxtRouteMiddleware(async to => {
  const jwt = to.query.jwt;

  // This only happens right after logging in
  if (typeof jwt === "string" && jwt.length > 0) {
    if (!process.server) {
      localStorage.setItem("jwt", jwt);
      // @ts-ignore if we were to set it to null to satisfy TS, it would leave an empty ?jwt= in the URL
      to.query.jwt = undefined;

      // because this is basically the sign up process, we need to let the backed know that a new user has just 'signed up'
      await $fetch("/api/signup", { headers: { Bearer: jwt } });

      return navigateTo(to, { replace: true });
    }
  }
});
