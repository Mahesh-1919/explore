import { NextRequest } from "next/server";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    const post = await db.posts.findUnique({
      where: {
        id: postId,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
