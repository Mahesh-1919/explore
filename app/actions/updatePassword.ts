"use server";
import db from "@/utils/db";

import bcrypt from "bcryptjs";
export async function updatePassword(email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await db.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
      },
    });
    return res;
  } catch (error) {
    return;
  }
}
