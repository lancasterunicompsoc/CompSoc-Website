import type { jwtPayloadType } from "~/utils/jwt";
import { verifyJWT } from "~/utils/jwt";

type authType = {
  jwt: string;
  decoded: jwtPayloadType;
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
    console.error("error while verifying jwt");
    console.error(e);
    console.log("unauthenticated request");
  }
});
