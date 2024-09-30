import type { PrismaClient, Prisma } from "@prisma/client";
import { useValidatedBody, z } from "h3-zod";
import type { authType } from "~/server/middleware/1.auth";

export default defineEventHandler(async event => {
  const {
    context: { prisma, auth },
  } = event;

  if (!auth?.isAdmin) {
    throw new Error("you do not belong here");
  }
  try {
    const { name, link, speaker } = await useValidatedBody(
      event,
      z.object({
        name: z.string().min(1),
        link: z.string().min(1),
        speaker: z.string(),
      }),
    );

    const created = await createSlides({
      prisma,
      auth,
      data: { name, link, speaker },
    });
    return { id: created.id, ok: true } as const;
  } catch (error) {
    console.error("Error adding slides:", error);
    throw createError("failed to add slides");
  }
});

type SlidesCreateType = Omit<
  Prisma.SlidesUncheckedCreateInput,
  "id" | "creatorId"
>;

export const createSlides = async ({
  prisma,
  auth,
  data,
}: {
  prisma: PrismaClient;
  auth: authType;
  data: SlidesCreateType;
}) => {
  return await prisma.slides.create({
    data: { ...data, creatorId: auth.decoded.id },
  });
};
