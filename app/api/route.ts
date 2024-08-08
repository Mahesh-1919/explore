import db from "@/utils/db";
import { NextResponse } from "next/server";

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

export async function GET(req: any) {
  try {
    const data = await db.posts.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
