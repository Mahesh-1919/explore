import db from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/authConfig";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect("/login");
  } else {
    const res = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    return NextResponse.json(res);
  }
}
