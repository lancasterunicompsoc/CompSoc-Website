import { createError as createServerError } from "h3";
import { verifyIssJwt, createJWT } from "~/utils/jwt";

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const jwt = query.jwt;

  if (typeof jwt !== "string") {
    throw createServerError("sign up without jwt from ISS");
  }

  try {
    const verified = await verifyIssJwt(jwt);
    console.log("iss token was verified");
    const { username, displayName, mail } = verified;

    const user = await event.context.prisma.user.findFirst({
      where: {
        username,
      },
    });

    // If this is the first time logging, we need to register the user
    let isFirstTime = false;
    if (user === null) {
      isFirstTime = true;
      await event.context.prisma.user.create({
        data: {
          username,
          displayName,
          mail,
        },
      });
    }

    const createdToken = await createJWT(verified, event.context.prisma);
    return { jwt: createdToken, ok: true, isFirstTime };
  } catch (e) {
    console.log(`entered catch, ${e}`);
    throw createServerError((e as Error).name);
  }
});
