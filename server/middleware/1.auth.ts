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
  if (!jwt || jwt === "undefined") {
    return;
  }

  try {
    const payload = await verifyJWT(jwt);
    const { prisma } = event.context;
    const user = await prisma.user.findUnique({
      where: { username: payload.username },
    });
    if (!user) {
      throw new Error("error while verifying request");
    }

    if (user.banned) {
      throw new Error("banned user");
    }

    if (user.role !== payload.role) {
      payload.role = user.role;
    }

    event.context.auth = { jwt, decoded: payload };
  } catch (e) {
    console.error("error while verifying jwt");
    console.error(e);
    console.log("unauthenticated request");
  }
});
