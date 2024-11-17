import type { jwtPayloadType } from "~/utils/jwt";
import { type H3Event, createError } from "h3";
import { userRoles } from "~/utils/roles";
import { verifyJWT } from "~/utils/jwt";

export type authType = {
  jwt: string;
  decoded: jwtPayloadType;
  isAdmin: boolean;
};

declare module "h3" {
  interface H3EventContext {
    auth?: authType;
  }
}

export const ensureIsAdmin = (event: H3Event) => {
  if (!event.context.auth?.isAdmin) {
    throw createError({ statusCode: 401, statusMessage: "unauthenticated" });
  }
};

export async function authenticate(event: H3Event, jwt: string) {
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
  return { user, payload };
}

export default eventHandler(async event => {
  const jwt = getRequestHeader(event, "Bearer");
  if (!jwt || jwt === "undefined" || jwt === "null" || jwt === "") {
    return;
  }

  try {
    const { user, payload } = await authenticate(event, jwt);

    const isAdmin = user.role === userRoles.ADMIN;

    event.context.auth = { jwt, decoded: payload, isAdmin };
  } catch (e) {
    console.error("error while verifying jwt");
    console.error(e);
    console.log("unauthenticated request");
  }
});
