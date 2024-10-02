import { ensureIsAdmin } from "../middleware/1.auth";

export default defineEventHandler(async event => {
  ensureIsAdmin(event);

  return event.context.prisma.user.findMany();
});
