"use server";
import db from "@/utils/db";

export const doFollow = async (userId: string, followerId: string) => {
  try {
    const res = await db.follows.create({
      data: {
        userId,
        followerId,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const doUnfollow = async (userId: string, followerId: string) => {
  try {
    const res = await db.follows.deleteMany({
      where: {
        userId: userId,
        followerId: followerId,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};
