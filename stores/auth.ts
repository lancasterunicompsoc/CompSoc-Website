import { defineStore } from "pinia";

export type jwtMetadataType = {
  iss?: string;
  iat?: number;
  exp?: number;
  nbf?: number;
  aud?: string;
  sub?: string;
  jti?: string;
};

/**
 * Decode a JWT without verifying the checksum
 */
export function decodeJwt<T>(token: string): T & jwtMetadataType {
  const parts = token.split(".");
  if (typeof parts[1] !== "string") {
    // eslint-disable-next-line
    throw new Error("badly formatted jwt");
  }
  const payloadString = atob(parts[1]);
  const payload = JSON.parse(payloadString);

  const { iss, aud, sub, jti, iat, exp, nbf, ...payloadData } = payload;
  const metadata: jwtMetadataType = {
    iss,
    aud,
    sub,
    jti,
    iat,
    exp,
    nbf,
  };

  for (const key of Object.keys(payloadData)) {
    const datum = payloadData[key];
    if (datum === "true") {
      // booleans
      payloadData[key] = true;
    } else if (datum === "false") {
      payloadData[key] = false;
    } else if (datum === "NaN") {
      // numbers / NaN
      payloadData[key] = NaN;
    } else if (!isNaN(datum) && !isNaN(parseFloat(datum))) {
      payloadData[key] = parseFloat(datum);
    }
  }

  return {
    ...payloadData,
    ...metadata,
  };
}
type decodedJWTPayload = jwtPayloadType & {
  iat: number;
  exp: number;
  iss: "compsoc";
};

interface AuthState {
  jwt: string | null;
  payload: decodedJWTPayload | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({ jwt: null, payload: null }),
  getters: {
    isLoggedIn() {
      if (!this.jwt || !this.payload) {
        return false;
      }
      if (!this.isExpired) {
        return true;
      }
      return false;
    },
    isAdmin: state => state.payload?.role === "ADMIN",
    isExpired: state =>
      state.payload === null ||
      state.payload.exp - Math.floor(Date.now() / 1000) <= 0,
  },
  actions: {
    setJWT(token: string) {
      try {
        const decoded = decodeJwt<decodedJWTPayload>(token);
        this.jwt = token;
        this.payload = decoded;
      } catch (e) {
        this.jwt = null;
        this.payload = null;
      }
    },
    logOut() {
      this.jwt = null;
      this.payload = null;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
