"use client";
import BlogCard from "@/components/BlogCard";
import { getCategories } from "./actions/categories";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
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
  const [post, setpost] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery(
    ["posts", currentPage],
    async () => {
      const res = await fetch(`/api?page=${currentPage}`);
      return res.json();
    },
    {
      keepPreviousData: true,
    }
  );

  const { data: categoriesList } = useQuery("categories", () =>
    getCategories()
  );

  useEffect(() => {
    if (postsData) {
      setpost(postsData);
    }
  }, [postsData]);

  const getCategorieData = async (id: string) => {
    const res = await fetch(`/api/posts/categories/${id}`);

    const data = await res.json();

    if (data) {
      setpost(data);
    }
  };

  return (
    <div className="flex flex-col h-full  ">
      <div className="flex flex-1">
        <main className="flex-1 py-8 md:py-12 lg:py-16 overflow-auto bg-secondary dark:bg-background ">
          {postsLoading && <Loader className="max-w-full  p-6" />}

          <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 flex-row">
            {postsError && <p>Error...</p>}
            {post &&
              post?.map((post: any) => (
                <BlogCard
                  key={post.id || post.post.id}
                  Title={post.title || post.post.title}
                  Description={post.description || post.post.description}
                  imageUrl={post.imageUrl || post.post.imageUrl}
                  postid={post.id || post.post.id}
                />
              ))}
          </div>
          <div className="container mt-8 md:mt-10 lg:mt-12 flex justify-center px-5">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  {currentPage > 1 && (
                    <PaginationPrevious
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="hover:bg-background dark:hover:bg-secondary"
                    />
                  )}
                </PaginationItem>

                {!(postsData?.length < 10) && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="hover:bg-background dark:hover:bg-secondary"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </main>
        <aside className="border-l px-4 py-6 hidden md:block sticky top-14 w-96 h-full bg-background overflow-y-hidden">
          <h1 className=" font-medium">Categories</h1>
          <ul className="mt-4  flex gap-2 flex-wrap">
            <li
              className={`group py-2 px-4 bg-base/50 rounded-full hover:bg-black dark:bg-secondary dark:hover:bg-secondary/50 hover:text-white cursor-pointer ${
                selectedId === null ? "active:bg-black active:text-white" : ""
              }`}
              onClick={() => {
                setpost(postsData);
                setSelectedId(null);
              }}
            >
              All
            </li>
            {categoriesList &&
              categoriesList.map((category: any) => (
                <li
                  key={category.id}
                  className={`group py-2 px-4 bg-base/50 rounded-full dark:bg-secondary hover:bg-black hover:text-white dark:hover:bg-secondary/50 cursor-pointer ${
                    selectedId === category.id
                      ? "active:bg-black active:text-white"
                      : ""
                  }`}
                  onClick={() => {
                    getCategorieData(category.id);
                    setSelectedId(category.id);
                  }}
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
