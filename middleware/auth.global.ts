export default defineNuxtRouteMiddleware((to) => {
  const jwt = to.query.jwt;

  if (typeof jwt === "string" && jwt.length > 0) {
    if (!process.server) {
      localStorage.setItem("jwt", jwt);
      // @ts-ignore if we were to set it to null to satisfy TS, it would leave an empty ?jwt= in the URL
      to.query.jwt = undefined;
      return navigateTo(to, { replace: true });
    }
  }
});
