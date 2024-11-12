import type { PrismaClient, Prisma } from "@prisma/client";
import { useSafeValidatedBody, useValidatedBody, z } from "h3-zod";
import { ZodError } from "zod";
import { ensureIsAdmin } from "~/server/middleware/1.auth";

export default defineEventHandler(async event => {
  const {
    context: { prisma },
  } = event;

  ensureIsAdmin(event);

  try {
    const validated = await useSafeValidatedBody(
      event,
      z.object({
        name: z.string().min(1),
        link: z.string().min(1),
        mimetype: z.string().min(1),
        speaker: z.string(),
        createdAt: z.string().transform(s => new Date(s)),
        updatedAt: z.string().transform(s => new Date(s)),
      }),
    );
    if (!validated.success) {
      console.error(validated.error.issues);
      throw createError({
        message: "validation error",
        statusMessage: JSON.stringify(validated.error.issues, null, 2),
        statusCode: 400,
      });
    }

    const created = await createSlides({
      prisma,
      data: validated.data,
    });
    return { id: created.id, ok: true } as const;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error.issues);
    } else {
      console.error("Error adding slides:", error);
    }
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
