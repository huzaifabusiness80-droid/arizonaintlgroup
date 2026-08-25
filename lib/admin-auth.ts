import { cookies } from "next/headers";
import { prisma } from "./prisma";

const SESSION_COOKIE = "az_admin_session";

export async function createSession(): Promise<string> {
  const token =
    Math.random().toString(36).substring(2) +
    Date.now().toString(36) +
    Math.random().toString(36).substring(2);

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

  await prisma.adminSession.create({
    data: { token, expiresAt },
  });

  return token;
}

export async function verifySession(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    const session = await prisma.adminSession.findUnique({ where: { token } });
    if (!session) return false;
    if (session.expiresAt < new Date()) {
      await prisma.adminSession.delete({ where: { token } });
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function deleteSession(token: string): Promise<void> {
  try {
    await prisma.adminSession.delete({ where: { token } });
  } catch {
    // ignore
  }
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}
