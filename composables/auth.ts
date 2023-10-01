import { decodeJwt } from "jose";
import type { jwtDecodedType } from "~/server/middleware/1.auth";

export const useAuth = () => {
  const jwt = useLocalStorage<string | undefined>("jwt", undefined);
  const decoded = computed(() => {
    if (jwt.value) {
      const payload = decodeJwt(jwt.value) as unknown as jwtDecodedType;
      return payload;
    }
    return undefined;
  });

  // Due to ISS issueing JWTs valid for only 5 seconds, we have decided to just ignore the expiration date...
  const isLoggedIn = computed(() => !!jwt.value);

  const logOut = () => {
    if (!process.server) {
      jwt.value = undefined;
    }
  };

  return { jwt, decoded, isLoggedIn, logOut };
};
