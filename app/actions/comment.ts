"use server";
import db from "@/utils/db";
import { comment } from "@/utils/types";

export const postComment = async ({ userId, postId, content }: comment) => {
  try {
    const res = await db.comments.create({
      data: {
        userId,
        postId,
        content,
        updatedAt: new Date(),
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};
