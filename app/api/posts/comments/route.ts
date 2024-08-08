import { NextResponse } from "next/server";
import db from "@/utils/db";

export const GET = async (req: Request) => {
  const postId = await req.json();
  try {
    const data = await db.comments.findMany({
      where: {
        postId,
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
