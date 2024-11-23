import { ensureIsAdmin } from "~/server/middleware/1.auth";

export default defineEventHandler(async event => {
  ensureIsAdmin(event);

  try {
    const data = await $fetch(
      "https://event-notification-discord.lucompsoc.workers.dev/",
      {
        headers: {
          "X-CS-Clippy": "true",
        },
      },
    );
    console.log("Webhook executed successfully:", data);
    return { ok: true };
  } catch (e) {
    console.error(`Discord webhook error: ${e.toString()}`);
    throw createError({
      statusCode: 500,
      statusMessage:
        "something went wrong while executing webhook call, please consult the logs",
    });
  }
});
