"use client";
import { Input } from "@/components/ui/input";
import React, { useState, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import QuillEditor from "@/components/quill";
import Upload from "@/app/actions/uploadDB";
import CategoryDropdown from "@/components/catogeryDropdown";
import { CategoriesData } from "@/utils/types";
import Image from "next/image";

type Props = {};

const Page = (props: Props) => {
  const initailValues = {
    title: "",
    description: "",
  };

  const { register, watch }: any = useForm<any>({
    defaultValues: initailValues,
  });

  const title = watch("title");
  const description = watch("description");
  const [content, setContent] = useState("Something");
  const [image, setImage] = useState<null>(null);
  const [error, setError] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<CategoriesData | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  const Submit = async (formData: FormData) => {
    try {
      if (!title) {
        setError("Title is required");
        return;
      } else if (!description) {
        setError("Description is required");
        return;
      } else if (!selectedStatus) {
        setError("Category is required");
        return;
      } else {
        formData.append("content", content);
        if (selectedStatus) {
          formData.append("category", selectedStatus.id);
        }
        const res = await Upload(formData);
        if (!res) {
          setError("Something went wrong");
        } else {
          formRef.current?.reset();
        }
      }
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
      <div className="grid grid-rows-2 md:grid-cols-2  ">
        <form className="p-8 h-full" action={Submit} ref={formRef}>
          <h1 className="font-bold text-xl">New Blog</h1>
          <div className=" mx-auto py-4">
            <Input
              id="Title"
              placeholder="Title"
              type="text"
              className="border-none text-4xl font-bold  font-serif  text-ellipsis placeholder:text-gray-400 "
              {...register("title", { required: "Title is required" })}
            />

            <Separator className="my-4" />
            <Input
              id="Description"
              placeholder="Description"
              type="text"
              className="border-none text-2xl font-bold  font-serif  text-ellipsis placeholder:text-gray-400"
              {...register("description", {
                required: "Description is required",
              })}
            />
            <Separator className="my-4" />

            <div className="flex gap-2">
              <Input
                type="file"
                placeholder="choose title Image"
                name="image"
                onChange={(e: any) => setImage(e.target.files[0])}
              />
              <CategoryDropdown
                setSelectedStatus={setSelectedStatus}
                selectedStatus={selectedStatus}
              />
            </div>

            <div className="md:w-full h-80 border-none text-xl my-4 ">
              <QuillEditor content={content} setContent={setContent} />
            </div>
            <div className="flex gap-4 items-center">
              <Button type="submit">submit</Button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </form>

        <div className="p-8 md:overflow-y-auto h-[95vh] hidden md:block">
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="image"
              className="w-full h-80"
            />
          )}
          <h1 className="text-4xl font-serif">{title}</h1>
          <h3>{description}</h3>

          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="p-8 text-wrap   "
          />
        </div>
      </div>
    </>
  );
};

export default Page;
