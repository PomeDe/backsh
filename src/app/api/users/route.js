import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET → бүх user авах
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM users");

    return NextResponse.json({
      success: true,
      users: rows,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "DB error" },
      { status: 500 }
    );
  }
}

// POST → шинэ user нэмэх
export async function POST(req) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, password, age } = body;

    const [result] = await db.query(
      "INSERT INTO users (first_name, last_name, email, age, password, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
      [firstName, lastName, email, age, password]
    );
    console.log(result);

    return NextResponse.json({
      success: true,
      message: "Амжилттай нэмэгдлээ",
      insertId: result.insertId,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Insert error" },
      { status: 500 }
    );
  }
}
