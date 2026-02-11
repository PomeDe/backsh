import { NextResponse } from "next/server";
import {db} from "@/lib/db";

export async function GET() {
    try{
        const [rows] = await db.query("SELECT * FROM users");
        return NextResponse.json({
            success: true,
            data: rows
        });
    }catch(error){
        return NextResponse.json({
            success:false ,message: error.message 
        },
    {
        status:500
    })
    }
}
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const values = [name, email, password];

    const [result] = await db.query(query, values); 

    if (result.affectedRows === 0) {
      return NextResponse.json({
        success: false,
        error: 'Failed to add user',
      }, { status: 500 });
    }

    const newUser = {
      id: result.insertId,
      name,
      email,
      password, 
    };

    return NextResponse.json({ success: true, user: newUser });

  } catch (error) {
    console.error('Database insertion error:', error);

    return NextResponse.json({
      success: false,
      error: 'Failed to add user',
    }, { status: 500 });
  }
}
