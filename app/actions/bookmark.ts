"use server";
import db from "@/utils/db";

export const removeBookmark = async (postId: string, userId: string) => {
  try {
    const res = await db.bookmark.deleteMany({
      where: {
        userId,
        postId,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const addBookmark = async (postId: string, userId: string) => {
  try {
    const isbookmarked = await db.bookmark.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (isbookmarked) {
      return isbookmarked;
    } else {
      const res = await db.bookmark.create({
        data: {
          userId,
          postId,
        },
      });

      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
