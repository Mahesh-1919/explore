"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import QuillEditor from "@/components/quill";
import Upload from "@/app/actions/uploadDB";
import CategoryDropdown from "@/components/catogeryDropdown";
import { CategoriesData } from "@/utils/types";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
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
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<CategoriesData | null>(
    null
  );

  const Submit = async (formData: FormData) => {
    try {
      setLoading(true);
      if (!title) {
        setError("Title is required");

        return;
      } else if (!description) {
        setError("Description is required");

        return;
      } else if (!selectedStatus) {
        setError("Category is required");
        setLoading(false);
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
          toast.success("Blog created successfully");
          router.push(`/${res.id}`);
        }
        setLoading(false);
      }
    } catch (err: any) {
      setError(err);
      setLoading(!loading);
    }
  };

  return (
    <>
      <div className="grid grid-rows-2 md:grid-cols-2 bg-background h-full overflow-hidden">
        <form className="p-8 h-full" action={Submit}>
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
              <Button type="submit">{loading ? "saving.." : "submit"}</Button>
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
              width={400}
              height={300}
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
