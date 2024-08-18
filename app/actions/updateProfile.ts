"use server";
import db from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/authConfig";
import { UploadImage } from "./uploadDB";

export default async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const Image = formData.get("Image") as File;
  const username = formData.get("username") as string;
  const description = formData.get("Description") as string;

  try {
    const ImageUrl = await UploadImage(Image);
    const res: any = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        description,
        profile_picture: ImageUrl,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}
