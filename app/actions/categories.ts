"use server";
import db from "@/utils/db";

export const getCategories = async () => {
  try {
    const res: any = await db.category.findMany();

    return res;
  } catch (error) {
    return error;
  }
};
