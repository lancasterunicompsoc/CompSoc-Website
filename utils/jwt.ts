import type { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { jwtVerify as joseJwtVerify } from "jose";

// eslint-disable-next-line camelcase
const { iss_jwt_secret, site_jwt_secret } = useRuntimeConfig();
const encodedIssSecret = new TextEncoder().encode(iss_jwt_secret);

export type jwtDecodedType = {
  iat: number;
  exp: number;
  username: string;
  displayName: string;
  mail: string;
};

export type Role = keyof typeof userRoles;
export type jwtPayloadType = {
  id: string;
  username: string;
  displayName: string;
  mail: string;
  banned: boolean;
  role: Role;
};

export async function verifyIssJwt(jwt: string): Promise<jwtDecodedType> {
  const { payload } = await joseJwtVerify(jwt, encodedIssSecret, {
    clockTolerance: 60, // due to ISS issuing tokens which only last for 5 seconds, people on a bad connection might have troubles completing the login cycle in less than 5s
  });
  return payload as unknown as jwtDecodedType;
}

export async function verifyJWT(token: string) {
  return jwt.verify(token, site_jwt_secret) as jwtPayloadType & {
    iat: number;
    exp: number;
  };
}

export async function createJWT(
  issJwtData: jwtDecodedType,
  prisma: PrismaClient,
) {
  const { username } = issJwtData;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw new Error("user not found");
  }

  if (user.banned) {
    throw new Error("user banned");
  }

  const payload: jwtPayloadType = {
    id: user.id,
    username,
    banned: user.banned,
    role: user.role,
    displayName: user.displayName,
    mail: user.mail,
  };

  return jwt.sign(payload, site_jwt_secret, {
    expiresIn: "1 week",
    issuer: "compsoc",
  });
}
