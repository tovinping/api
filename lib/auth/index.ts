import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { nanoid } from "nanoid";

// see https://github.com/vercel/examples/blob/main/edge-middleware/jwt-authentication

interface UserJwtPayload extends JWTPayload {
  username: string;
}
export class AuthError extends Error {}

export async function verifyAuth(token: string) {
  if (!token) throw new AuthError("Missing user token");
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload as UserJwtPayload;
  } catch (err: unknown) {
    console.log('verifyAuth error=', (err as Error).message)
    return null
  }
}

export async function signJwt(payload: UserJwtPayload) {
  const isProduction = process.env.NODE_ENV === "production";
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(isProduction ? "4h" : "300s")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return token;
}
