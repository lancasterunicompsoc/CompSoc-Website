import type { PrismaClient } from "@prisma/client";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { authenticate } from "~/server/middleware/1.auth";

export type UploadClientPayloadType = {
  Bearer: string;
  body: { name: string; speaker: string };
};
type TokenPayloadBody = UploadClientPayloadType["body"];

export default defineEventHandler(async event => {
  const {
    context: { prisma },
  } = event;

  console.log(`UPLOAD request from ${getRequestIP(event)}`);
  console.log(`fingerprint: ${await getRequestFingerprint(event)}`);
  console.log(`headers: ${JSON.stringify(getRequestHeaders(event), null, 2)}`);
  const body = (await readBody(event)) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: event.node.req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        console.log(clientPayload);
        if (!clientPayload || clientPayload?.length === 0) {
          throw createError("unauthenticated request");
        }
        try {
          const payload = JSON.parse(clientPayload) as UploadClientPayloadType;
          const { Bearer: jwt, body: payloadBody } = payload;
          authenticate(event, jwt);
          return {
            allowedContentTypes: ["application/pdf", "image/jpeg"],
            tokenPayload: JSON.stringify(payloadBody),
          };
        } catch (e) {
          console.error(e);
          throw createError({
            statusCode: 500,
            statusMessage: "something went wrong while parsing upload body",
          });
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // this is a webhook, sent by vercel, therefore no auth necessary
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow
        if (!tokenPayload) {
          console.error("bad data from vercel onUploadComplete hook");
          console.error(blob);
          return;
        }
        const tokenPayloadBody = JSON.parse(tokenPayload) as TokenPayloadBody;

        const link = blob.downloadUrl.replace("?download=1", "");
        const data = {
          ...tokenPayloadBody,
          link,
          mimetype: blob.contentType ?? "application/octet-stream",
        };
        const result = await createSlides({
          prisma,
          data,
        });
        console.log(
          `UPLOAD to vercel storage complete: ${JSON.stringify(data, null, 2)}`,
        );
      },
    });

    return jsonResponse;
  } catch (error) {
    // The webhook will retry 5 times waiting for a 200
    console.error(error);
    throw createError({
      statusCode: 400,
      message: JSON.stringify({ error: (error as Error).message }),
    });
  }
});

type SlidesCreateType = {
  link: string;
  mimetype: string;
  name: string;
  speaker: string;
};

export const createSlides = async ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: SlidesCreateType;
}) => {
  // TODO: this function just isn't working it appears
  return prisma.slides.create({
    data,
  });
};
