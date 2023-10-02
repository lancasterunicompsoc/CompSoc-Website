export default defineEventHandler(async event => {
  try {
    const { id } = await readBody(event);

    await event.context.prisma.event.delete({
      where: { id },
    });

    // Send the ID of the newly created event in the response
    return { ok: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { ok: false };
  }
});
