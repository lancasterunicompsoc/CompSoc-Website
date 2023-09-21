import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async event => {
  try {
    const prisma = new PrismaClient();
    const { name, location, summary, description, slides, organizer, startTime, endTime } =
      await readBody(event);

    // Use Prisma to create a new event
    const newEvent = await prisma.event.create({
      data: {
        name,
        location,
        summary,
        description,
        slides,
        organizer,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });
    prisma.$disconnect()

    // Send the ID of the newly created event in the response
    return { id: newEvent.id };
  } catch (error) {
    console.error("Error adding event:", error);
    return "";
  }
});
