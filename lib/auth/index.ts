import { NextRequest } from 'next/server'

import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { nanoid } from 'nanoid';

// see https://github.com/vercel/examples/blob/main/edge-middleware/jwt-authentication

interface UserJwtPayload extends JWTPayload {
  username: string;
}
export class AuthError extends Error {}

export async function verifyAuth(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) throw new AuthError("Missing user token");

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new AuthError("Your token has expired.");
  }
}

export async function signJwt(payload: UserJwtPayload) {
  const token = await new SignJWT({...payload})
  .setProtectedHeader({ alg: 'HS256' })
  .setJti(nanoid())
  .setIssuedAt()
  .setExpirationTime('4h')
  .sign(new TextEncoder().encode(process.env.JWT_SECRET))

  return token;
}