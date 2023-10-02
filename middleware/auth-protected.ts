export default defineNuxtRouteMiddleware(to => {
  if (!process.server) {
    const jwt = localStorage.getItem("jwt");
    if (jwt === null) {
      return abortNavigation("Please log in first");
    }
  }
});
