import db from "@/utils/db";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: any) {
  try {
    const { username, password, email } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
