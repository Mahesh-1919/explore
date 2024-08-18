import { NextResponse } from "next/server";
import db from "@/utils/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/authConfig";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  try {
    const data = await db.posts.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
