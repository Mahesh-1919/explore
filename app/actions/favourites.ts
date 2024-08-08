"use server";
import db from "@/utils/db";

export const getFavs = async (userId: string) => {
  try {
    const bookmarks = await db.bookmark.findMany({
      where: {
        userId: userId,
      },
      include: {
        post: true,
      },
    });

    return bookmarks;
  } catch (error) {
    console.log(error);
  }
};
