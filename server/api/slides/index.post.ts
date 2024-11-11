import type { PrismaClient, Prisma } from "@prisma/client";
import { useValidatedBody, z } from "h3-zod";
import { ensureIsAdmin } from "~/server/middleware/1.auth";

export default defineEventHandler(async event => {
  const {
    context: { prisma },
  } = event;

  ensureIsAdmin(event);

  try {
    const data = await useValidatedBody(
      event,
      z.object({
        name: z.string().min(1),
        link: z.string().min(1),
        mimetype: z.string().min(1),
        speaker: z.string(),
      }),
    );

    const created = await createSlides({
      prisma,
      data,
    });
    return { id: created.id, ok: true } as const;
  } catch (error) {
    console.error("Error adding slides:", error);
    throw createError("failed to add slides");
  }
});

type SlidesCreateType = Omit<Prisma.SlidesUncheckedCreateInput, "id">;

export const createSlides = async ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: SlidesCreateType;
}) => {
  return await prisma.slides.create({
    data: { ...data },
  });
};
