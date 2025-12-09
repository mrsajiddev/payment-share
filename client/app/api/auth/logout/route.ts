import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // Remove cookies by setting maxAge to 0
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  cookieStore.set("user", "", {
    maxAge: 0,
    path: "/",
  });

  return NextResponse.json({ message: "Logged out successfully", success: true });
}
