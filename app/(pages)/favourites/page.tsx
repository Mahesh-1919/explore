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
    <div className="container grid grid-cols-1  gap-6 md:gap-8 lg:gap-10 flex-row   w-[80%] px-0 mt-6">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}
      {data &&
        data?.map((post: any) => (
          <BlogCard
            key={post?.post.id}
            Author={post?.post?.Author}
            Title={post?.post?.title}
            Description={post?.post?.description}
            imageUrl={post?.post?.imageUrl}
            postid={post?.post?.id}
          />
        ))}
    </div>
  );
};

export default Page;
