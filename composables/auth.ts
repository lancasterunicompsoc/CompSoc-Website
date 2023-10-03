import { decodeJwt } from "jose";

type jwtPayloadType = {
  username: string;
  banned: boolean;
  role: "USER" | "PRIVILEGED" | "ADMIN";
  displayName: string
  mail: string
  iat: number;
  exp: number;
  iss: "compsoc";
};

export const useAuth = () => {
  const jwt = useLocalStorage<string | null>("jwt", null);
  const decoded = computed(() => {
    if (jwt.value) {
      const payload = decodeJwt(jwt.value) as unknown as jwtPayloadType;
      return payload;
    }
    return undefined;
  });

  const isLoggedIn = computed(() => jwt.value && jwt.value.length > 50);

  const logOut = () => {
    jwt.value = null;
  };

  return { jwt, decoded, isLoggedIn, logOut };
};
