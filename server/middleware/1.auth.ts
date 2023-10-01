import {
  jwtVerify as joseJwtVerify,
  errors as joseErrors,
  decodeJwt,
} from "jose";

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
  const jwt = getRequestHeader(event, "Bearer");
  console.log(`request with jwt bearer coming in. jwt: ${jwt}`);
  if (!jwt || jwt === "undefined") {
    return;
  }

  try {
    const payload = await verifyJWT(jwt);
    event.context.auth = { jwt, decoded: payload };
  } catch (e) {
    // funny thing here... ISS has a service that issues JWTs for us, unfortunately they expire after 5s
    // soooo, because we don't want to set up our own auth, we're just gonna ignore whether a JWT is expired...
    // TODO: much better idea: when we see a request with a JWT with a 5s exipiration time coming in, we can just issue a new one thats valid for longer
    if (e instanceof joseErrors.JWTExpired) {
      console.log("encountered expired JWT, will just accept it");

      const payload = decodeJwt(jwt) as unknown as jwtDecodedType;
      event.context.auth = { jwt, decoded: payload };
    }
  }
});
