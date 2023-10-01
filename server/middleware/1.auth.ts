import { jwtVerify as joseJwtVerify, errors as joseErrors } from "jose";
import type { JOSEError } from "jose/dist/types/util/errors";

const { secret } = useRuntimeConfig();
const encodedSecret = new TextEncoder().encode(secret);

export type jwtDecodedType = {
  iat: number;
  exp: number;
  username: string;
  displayName: string;
  mail: string;
};

type authType = {
  jwt: string;
  decoded: jwtDecodedType;
};

declare module "h3" {
  interface H3EventContext {
    auth?: authType;
  }
}

async function verifyJWT(jwt: string): Promise<jwtDecodedType> {
  const { payload } = await joseJwtVerify(jwt, encodedSecret);
  return payload as unknown as jwtDecodedType;
}
export default eventHandler(async event => {
  const url = getRequestURL(event);
  const jwt = url.searchParams.get("jwt");
  if (!jwt) {
    return;
  }

  try {
    const payload = await verifyJWT(jwt);
    event.context.auth = { jwt, decoded: payload };
  } catch (e) {
    // funny thing here... ISS has a service that issues JWTs for us, unfortunately they expire after 5s
    // soooo, because we don't want to set up our own auth, we're just gonna ignore whether a JWT is expired...
    if (e instanceof joseErrors.JWTExpired) {
      console.log("encountered expired JWT, will just accept it");
    } else {
      throw e;
    }
  }
});
