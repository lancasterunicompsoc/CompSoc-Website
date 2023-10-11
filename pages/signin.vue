<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

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
      return;
    }
    router.replace("/");
  } catch (e) {
    router.replace("/");
    console.error(e);
  }
});
</script>
