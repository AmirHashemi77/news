import "server-only";
import { createHash, randomBytes } from "crypto";
import { SESSION_COOKIE_NAME, SESSION_TTL_SECONDS } from "../session.config";
import { createSessionRecord, deleteSessionByTokenHash, findSessionByTokenHash } from "../repository/session.repository";
import { cookies } from "next/headers";

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSessionToken(userId: string) {
  const token = randomBytes(32).toString("base64url");

  const tokenHash = hashSessionToken(token);

  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);

  await createSessionRecord({ userId, tokenHash, expiresAt });

  return {
    token,
    expiresAt,
  };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }
  const tokenHash = hashSessionToken(token);

  const session = await findSessionByTokenHash(tokenHash);

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    return null;
  }

  return session.user;
}

export async function revokeSession(token: string) {
  const tokenHash = hashSessionToken(token);

  await deleteSessionByTokenHash(tokenHash);
}
