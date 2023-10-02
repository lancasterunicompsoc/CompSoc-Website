import type { jwtDecodedType } from "~/utils/jwt";

type authType = {
  jwt: string;
  decoded: jwtDecodedType;
};

declare module "h3" {
  interface H3EventContext {
    auth?: authType;
  }
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
    console.log("unauthenticated request");
  }
});
