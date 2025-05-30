import { del } from "@vercel/blob";
import { useValidatedBody, z } from "h3-zod";
import { ensureIsAdmin } from "~/server/middleware/1.auth";

export default defineEventHandler(async event => {
  const {
    context: { prisma },
  } = event;

  ensureIsAdmin(event);

  try {
    const { id } = await useValidatedBody(
      event,
      z.object({
        id: z.string().min(1),
      }),
    );
    const slides = await prisma.slides.findUnique({
      where: { id },
      select: { link: true },
    });
    if (!slides) {
      throw createError({
        status: 500,
        statusMessage: "no slides with that id",
      });
    }

    // delete the blob at vercel storage, but only if its stored on that
    // the links look smth like this: https://1vzq7232vosxriru.public.blob.vercel-storage.com/ocaml-Gs5v4y8AhydfulkQl2hrlEP6cwFlXX.jpg
    try {
      const parsedUrl = new URL(slides.link);
      if (parsedUrl.hostname.endsWith("blob.vercel-storage.com")) {
        await del(slides.link);
      }
    } catch (e) {
      console.error(`couldn't parse malformed url: ${slides.link}`);
    }

    await prisma.slides.delete({ where: { id } });

    return { id, ok: true } as const;
  } catch (error) {
    console.error("Error deleting slides:", error);
    throw createError("failed to delete slides");
  }
});
