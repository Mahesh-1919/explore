"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import Image from "next/image";
import {
  Bookmark,
  Share,
  MessageCircleMore,
  Heart,
  BookmarkCheck,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { postLike } from "@/app/actions/likes";
import { addBookmark, removeBookmark } from "@/app/actions/bookmark";
import { useSession } from "next-auth/react";
type Props = {};

const Page = (props: Props) => {
  const { postid } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: session }: any = useSession();

  const { data } = useQuery("post", async () => {
    const res = await fetch(`/api/posts/${postid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return res.json();
  });

  const [likes, setLikes] = useState();

  useEffect(() => {
    setLikes(data?.likes);
  }, [data]);

  const addLke = async (postId: string) => {
    const res: any = await postLike(postId);
    setLikes(res?.likes);
    return res;
  };

  const BookMark = async (postId: string, userId: string) => {
    try {
      if (isBookmarked) {
        await removeBookmark(postId, userId);
        setIsBookmarked(false);
      } else {
        await addBookmark(postId, userId);
        setIsBookmarked(true);
      }
      console.log("bookmarked");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center w-full  h-full overflow-y-auto mt-6  ">
      <div className="w-[90%] md:w-[70%]  flex justify-center flex-col items-center gap-2   ">
        <div className="  bg-secondary/90 w-full  rounded-lg flex justify-center p-2 h-96">
          <Image
            src={data?.imageUrl}
            alt={data?.title}
            className=" object-contain "
          />
        </div>

        <div className="flex justify-between gap-4  w-full px-2 my-2 ">
          <h3>{data?.Author}</h3>
          <div className="flex  gap-2 ">
            <Button
              variant="outline"
              className="border-none flex items-center gap-2"
              onClick={() => addLke(data?.id)}
            >
              <span>{likes}</span>
              <Heart size={20} fill="red" stroke="red" />
            </Button>
            <Button
              variant="outline"
              className="border-none"
              onClick={() => BookMark(data?.id, session?.user?.id)}
            >
              {isBookmarked ? (
                <BookmarkCheck size={20} />
              ) : (
                <Bookmark size={20} />
              )}
            </Button>
            <Button variant="outline" className="border-none">
              <MessageCircleMore size={20} />
            </Button>
            <Button variant="outline" className="border-none">
              <Share size={20} />
            </Button>
          </div>
        </div>
        <Separator />
        <div className=" w-full h-full">
          <h1 className="text-4xl font-medium font-serif ">{data?.title}</h1>
          <p>{data?.description}</p>
          <div
            dangerouslySetInnerHTML={{ __html: data?.content }}
            className="md:p-4 text-wrap  p-2 "
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
