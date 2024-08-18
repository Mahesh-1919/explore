"use client";
import React from "react";
import { useQuery } from "react-query";
import BlogCard from "@/components/BlogCard";
type Props = {};

const Page = (props: Props) => {
  const { data, isLoading, isError } = useQuery("posts", async () => {
    const res = await fetch("/api/posts");
    return res.json();
  });

  return (
    <div className="w-full h-full bg-secondary dark:bg-background overflow-y-auto md:pb-28 pb-20 ">
      <div className="   container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 flex-row mt-6 md:w-[70%] w-full  dark:bg-background bg-secondary ">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error...</p>}
        {data &&
          data?.map((post: any) => (
            <BlogCard
              key={post?.id}
              Title={post?.title}
              Description={post?.description}
              imageUrl={post?.imageUrl}
              postid={post?.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Page;
