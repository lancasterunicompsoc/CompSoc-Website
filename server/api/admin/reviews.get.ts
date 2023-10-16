import { createError as createServerError } from "h3";

export default defineEventHandler(async ({ context: { auth, prisma } }) => {
  if (!auth || auth.decoded.role !== "ADMIN") {
    throw createServerError("you do not belong here, go back to where you came from");
  }

  return prisma.review.findMany();
});
