<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { getRedirectUrl } from "~/utils/redirect";

const route = useRoute();
const router = useRouter();
const jwt = route.query.jwt;

const authstore = useAuthStore();

onMounted(async () => {
  if (jwt === undefined || Array.isArray(jwt) || jwt === null) {
    router.replace("/");
    return;
  }

  try {
    const result = await $fetch(`/api/signup?jwt=${jwt}`);
    if (!result.ok) {
      console.error(`Error while signup: ${result}`);
    }
    authstore.setJWT(result.jwt);
    if (result.isFirstTime === true) {
      router.replace("/onboarding");
    }
  } catch (e) {
    console.error(e);
  }

  const redirectUrl = getRedirectUrl();
  if (redirectUrl) {
    router.replace(redirectUrl);
  } else {
    router.replace("/");
  }
});
</script>

<template>
  <noscript>
    This website only works if you enable Javascript in your browser, please
    enable Javascript execution and reload the page.
  </noscript>
</template>
