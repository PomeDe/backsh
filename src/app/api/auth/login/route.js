import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json({ success: false });
    }

    const user = users[0];

    if (user.password !== password) {
      return NextResponse.json({ success: false });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("loggedIn", "true", {
      httpOnly: true,
      path: "/",
    });

    response.cookies.set("userId", user.id.toString(), {
      httpOnly: true,
      path: "/",
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}