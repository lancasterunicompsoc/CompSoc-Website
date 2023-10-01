export default defineEventHandler(async event => {
  if (!event.context.auth) {
    return;
  }

  const { username, displayName, mail } = event.context.auth.decoded;

  const user = await event.context.prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (user !== null) {
    console.log(`user ${username} already exists, this request was just a token refresh`);
    return;
  }

  await event.context.prisma.user.create({
    data: {
      username,
      displayName,
      mail,
    },
  });

  console.log(`new user signed up with username: ${username}`);
});
