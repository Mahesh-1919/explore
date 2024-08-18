"use client";
import React, { useEffect, useState } from "react";
import { getFavs } from "@/app/actions/favourites";
import { useSession } from "next-auth/react";
import BlogCard from "@/components/BlogCard";
import { useQuery } from "react-query";
type Props = {};

const Page = (props: Props) => {
  const { data: session }: any = useSession();

  const { data, isLoading, isError } = useQuery("favourites", async () => {
    const res = await getFavs(session?.user?.id);
    return res;
  });

  return (
    <div className="w-full h-full bg-secondary dark:bg-background overflow-y-auto md:pb-28 pb-20 ">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 flex-row mt-6 w md:w-[70%] w-full">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error...</p>}
        {data &&
          data?.map((post: any) => (
            <BlogCard
              key={post?.post.id}
              Title={post?.post?.title}
              Description={post?.post?.description}
              imageUrl={post?.post?.imageUrl}
              postid={post?.post?.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Page;
