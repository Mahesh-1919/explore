"use server";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import db from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/authConfig";

dotenv.config();

cloudinary.config({
  cloud_name: "dhtuiphwt",
  api_key: "729363333338947",
  api_secret: "YSXIDryvICECrgnX4E9rviA76Lc",
  secure: true,
});

const UploadImage = async (file: File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "Blogs",
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

    console.log("result", result.url);

    return result.url;
  } catch (err: any) {
    throw new Error(err);
  }
};

const uploadDb = async (formData: FormData) => {
  const session: any = await getServerSession(authOptions);
  const file = formData.get("image") as File;
  const imageUrl = await UploadImage(file);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const userId = session?.user?.id;
  const categoryId = formData.get("category") as string;
  const Author = session?.user?.name;

  try {
    const res = await db.posts.create({
      data: {
        userId,
        title,
        description,
        imageUrl,
        content,
        updatedAt: new Date(),
        Author,
      },
    });

    await db.postCategory.create({
      data: {
        postId: res.id,
        categoryId,
      },
    });

    return res;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default uploadDb;
