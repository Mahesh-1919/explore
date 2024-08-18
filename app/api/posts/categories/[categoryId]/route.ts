import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { categoryId } }: { params: { categoryId: string } }
) {
  try {
    const res = await db.postCategory.findMany({
      where: {
        categoryId,
      },
      include: {
        post: true,
      },
    });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
