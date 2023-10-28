import UpcomingEvents from "~/mail/templates/UpcomingEvents";
import { sendEmail } from "~/utils/mail";

export default defineEventHandler(async ({ context: { prisma } }) => {
  const events = await $fetch("/api/events/all?weeks=1");
  if (events.length === 0) {
    return { err: "no events" };
  }
  const content = UpcomingEvents({ events });
  const users = await prisma.user.findMany();
  try {
    return await sendEmail({
      from: "Clippy <clippy@compsoc.io>",
      reply_to: "Events Officer <events@compsoc.io>",
      bcc: users.map(u => u.mail),
      to: "president@compsoc.io",
      subject: "Upcoming CompSoc Events",
      html: content,
    });
  } catch (error) {
    return { error };
  }
});
