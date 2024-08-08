"use client";
import BlogCard from "@/components/BlogCard";
import { getCategories } from "./actions/categories";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SearchValue } from "@/store/atom";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

export default function Component() {
  const [searchValue, setSearchValue] = useRecoilState(SearchValue);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery("posts", async () => {
    const res = await fetch("/api");
    return res.json();
  });

  const { data: categoriesData } = useQuery("categories", () =>
    getCategories()
  );

  useEffect(() => {
    const data = postsData?.filter((post: any) => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    setSuggestions(data);
  }, [searchValue, postsData]);

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="flex flex-1">
        <main className="flex-1 py-8 md:py-12 lg:py-16 overflow-auto">
          <div className="container grid grid-cols-1  gap-6 md:gap-8 lg:gap-10 flex-row w-[90%] px-0">
            {postsLoading && <p>Loading...</p>}
            {postsError && <p>Error...</p>}
            {postsData &&
              postsData?.map((post: any) => (
                <BlogCard
                  key={post.id}
                  Author={post.Author}
                  Title={post.title}
                  Description={post.description}
                  imageUrl={post.imageUrl}
                  postid={post.id}
                />
              ))}
          </div>
          <div className="container mt-8 md:mt-10 lg:mt-12 flex justify-center px-5">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>
        <aside className="bg-muted/40 border-l px-4 py-6 hidden md:block sticky top-14 w-96 h-[calc(94vh)]">
          <h1 className=" font-medium">Categories</h1>
          <ul className="mt-4  flex gap-2 flex-wrap">
            {categoriesData &&
              categoriesData.map((category: any) => (
                <li
                  key={category.id}
                  className="py-2 px-4 bg-base/50 rounded-full hover:bg-black hover:text-white"
                >
                  {category.name}
                </li>
              ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
