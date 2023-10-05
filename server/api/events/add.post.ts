import { useValidatedBody, z } from "h3-zod";
export default defineEventHandler(async event => {
  if (event.context.auth?.decoded?.role !== "ADMIN") {
    throw new Error("you do not belong here");
  }
  try {
    const {
      name,
      location,
      summary,
      description,
      slides,
      organizer,
      startTime,
      endTime,
      difficulty,
    } = await useValidatedBody(
      event,
      z.object({
        name: z.string(),
        location: z.string(),
        summary: z.string(),
        description: z.string(),
        slides: z
          .string()
          .refine(value => value.startsWith("https://slides.compsoc.io/") || value == ""),
        organizer: z.string(),
        startTime: z.coerce.date(),
        endTime: z.coerce.date(),
        difficulty: z.enum(["EASY", "HARD", "SOCIAL"]),
      }),
    );

    // Use Prisma to create a new event
    const newEvent = await event.context.prisma.event.create({
      data: {
        name,
        location,
        summary,
        description,
        slides,
        organizer,
        startTime,
        endTime,
        difficulty,
      },
    });
    // Send the ID of the newly created event in the response
    return { id: newEvent.id };
  } catch (error) {
    console.error("Error adding event:", error);
    return { ok: false, error };
  }
});
