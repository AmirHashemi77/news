export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export const SESSION_COOKIE_NAME = process.env.NODE_ENV === "production" ? "__Host-session" : "session";

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
