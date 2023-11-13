import { useValidatedBody, z } from "h3-zod";
export default defineEventHandler(async event => {
  if (event.context.auth?.decoded?.role !== "ADMIN") {
    throw new Error("you do not belong here");
  }
  try {
    const {
      name,
      location,
      mazemapLink,
      summary,
      description,
      slides,
      image,
      organizer,
      unixStartTime,
      unixEndTime,
      difficulty,
    } = await useValidatedBody(
      event,
      z.object({
        name: z.string().min(1),
        location: z.string().min(1),
        mazemapLink: z.string(),
        summary: z.string().min(1),
        description: z.string().min(1),
        slides: z
          .string()
          .refine(
            value =>
              value.startsWith("https://slides.compsoc.io/") || value === "",
          ),
        image: z.string(),
        organizer: z.string().min(1),
        unixStartTime: z.number(),
        unixEndTime: z.number(),
        difficulty: z.enum(["EASY", "HARD", "SOCIAL"]),
      }),
    );

    // Use Prisma to create a new event
    const newEvent = await event.context.prisma.event.create({
      data: {
        name,
        location,
        mazemapLink,
        summary,
        description,
        slides,
        image,
        organizer,
        unixStartTime,
        unixEndTime,
        difficulty,
      },
    });
    // Send the ID of the newly created event in the response
    return { id: newEvent.id, ok: true } as const;
  } catch (error) {
    console.error("Error adding event:", error);
    throw createError("failed to add event");
  }
});
