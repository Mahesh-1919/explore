import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: any) {
  const { name } = await req.json();
  try {
    await db.category.create({
      data: {
        name: name,
      },
    });
    return NextResponse.json({ message: "Category created." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating category." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");
    const currentPage = page ? parseInt(page) : 1;
    const pageItems = 10;
    const skip = (currentPage - 1) * pageItems;
    const take = pageItems;

    const data = await db.posts.findMany({
      skip: skip,
      take: take,
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
