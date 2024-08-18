import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  Title: string;
  Description: string;
  imageUrl: string;
  postid: string;
};

const BlogCard = ({ Title, Description, imageUrl, postid }: Props) => {
  return (
    <>
      <article className="group rounded-lg overflow-hidden bg-background shadow-sm transition-all hover:shadow-md dark:bg-secondary/50 dark:hover:bg-secondary/30">
        <Link href={`/${postid}`} className="block" prefetch={false}>
          <Image
            src={imageUrl}
            alt="Blog post image"
            width={600}
            height={400}
            className="w-full h-48 object-cover "
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />

          <div className="p-4 md:p-6 ">
            <h2 className="text-lg font-semibold mb-2 line-clamp-2 ">
              {Title}
            </h2>
            <p className="text-muted-foreground mb-4 truncate text-ellipsis ">
              {Description}
            </p>
            <div className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
              Read more
              <ArrowRightIcon className="w-4 h-4" />
            </div>
          </div>
        </Link>
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
