import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { username } = await req.json();

    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
