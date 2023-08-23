import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Provider } from "next-auth/providers";
import { PrismaClient } from "@prisma/client";
import { NuxtAuthHandler } from "#auth";

const prisma = new PrismaClient();
const config = useRuntimeConfig();

const useMockAuth = process.env.NODE_ENV !== "production";
const providers: Provider[] = [];
if (!useMockAuth) {
  providers.push(
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    DiscordProvider.default({
      clientId: config.discord_client_id,
      clientSecret: config.discord_client_secret
    })
  );
} else {
  providers.push(
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      id: "github",
      name: "Mocked GitHub",
      async authorize (credentials: any) {
        if (credentials) {
          const name = credentials.name;
          console.log("gonna return the user");
          return {
            id: name,
            name,
            email: name
          };
        }
        return null;
      },
      credentials: {
        name: { type: "test" }
      }
    })
  );
}

export default NuxtAuthHandler({
  // TODO: SET A STRONG SECRET, SEE https://sidebase.io/nuxt-auth/configuration/nuxt-auth-handler#secret
  secret: config.secret,
  adapter: PrismaAdapter(prisma),
  providers
});
