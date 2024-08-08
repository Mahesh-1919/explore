import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type Props = {
  Author: string;
  Title: string;
  Description: string;
  imageUrl: string;
  postid: string;
};

const BlogCard = ({ Author, Title, Description, imageUrl, postid }: Props) => {
  return (
    <>
      <article className="group rounded-lg overflow-hidden bg-background  transition-all hover:bg-muted/40  md:w-[80%] mx-auto  w-full">
        <div className="flex justify-between  items-center">
          <Link className="p-2 md:p-4 w-[70%]" href={`/${postid}`}>
            <div className="flex items-center gap-2 ">
              <Image
                src="/explore_12546374.png"
                alt="Author avatar"
                width={20}
                height={20}
                className=" rounded-full"
              />
              <span className="text-black">{Author}</span>
            </div>
            <div className="block">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                {Title}
              </h2>
            </div>
            <p className="text-muted-foreground line-clamp-3 mb-4">
              {Description}
            </p>
            <p className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
              Read more
              <ArrowRightIcon className="w-4 h-4" />
            </p>
          </Link>
          <div className=" w-[30%] flex justify-center">
            <Image
              src={imageUrl}
              alt="Blog post image"
              width={160}
              height={107}
              className=" p-4"
              style={{ aspectRatio: "150/150" }}
            />
          </div>
        </div>
        <Separator />
      </article>
    </>
  );
};

export default BlogCard;

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
