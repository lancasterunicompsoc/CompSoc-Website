export default defineEventHandler(async event => {
  if (event.context.auth?.decoded?.role !== "ADMIN") {
    throw new Error("you do not belong here");
  }
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
