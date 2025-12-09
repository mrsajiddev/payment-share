import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { token, user } = await request.json();

  // MUST AWAIT cookies()
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,  // 7 Days
  });

  cookieStore.set("user", JSON.stringify(user), {
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ message: "Logged in & cookie set" });
}
