export default defineEventHandler(async event => {
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
    } = await readBody(event);

    // Use Prisma to create a new event
    const newEvent = await event.context.prisma.event.create({
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

    // Send the ID of the newly created event in the response
    return { id: newEvent.id };
  } catch (error) {
    console.error("Error adding event:", error);
    return "";
  }
});
