import Location from "~/mail/components/icons/Location";
import Speaker from "~/mail/components/icons/Speaker";
import Time from "~/mail/components/icons/Time";

export default defineEventHandler(event => {
  const query = getQuery(event);
  const name = query.name ?? "";
  const iconData = {
    location: [Location(), "image/svg+xml"],
    speaker: [Speaker(), "image/svg+xml"],
    time: [Time(), "image/svg+xml"],
  }[name as string];
  if (iconData === undefined) {
    throw createError({
      statusCode: 404,
      statusMessage: `Unknown icon ${name}`,
    });
  }
  const [icon, contentType] = iconData;
  setResponseHeaders(event, {
    "Content-Type": contentType as string,
  });
  return icon;
});
