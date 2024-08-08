"use server";
import db from "@/utils/db";

export const postLike = async (postId: string) => {
  try {
    const res = await db.posts.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};
