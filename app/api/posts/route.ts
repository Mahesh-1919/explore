import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import { posts } from "@/utils/types";

export const GET = async (req: NextRequest) => {
  try {
    const data = await db.posts.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { userId, title, content, category }: posts = await req.json();

    await db.posts
      .create({
        data: {
          userId,
          title,
          content,
          category,
        },
      })
      .then((data) => {
        return NextResponse.json({ data }, { status: 201 });
      });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
