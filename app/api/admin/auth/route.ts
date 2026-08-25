import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "az_admin_session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 1. Check in database first
    const dbAdmin = await prisma.adminUser.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    const envAdminEmail = process.env.ADMIN_EMAIL || "admin@arizonaintlgroup.com";
    const envAdminPassword = process.env.ADMIN_PASSWORD || "Arizona@2024!";

    let isValid = false;

    if (dbAdmin && dbAdmin.password === password) {
      isValid = true;
    } else if (
      email.trim().toLowerCase() === envAdminEmail.toLowerCase() &&
      password === envAdminPassword
    ) {
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await createSession();

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("az_admin_session", "", { maxAge: 0, path: "/" });
  return response;
}
