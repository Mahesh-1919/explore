"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import UpdateProfile from "@/app/actions/updateProfile";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "react-query";

export default function EditProfile() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const initailValues = {
    username: "",
    Description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm<any>({
    defaultValues: initailValues,
  });

  const mutation: any = useMutation(
    (newData: FormData) => {
      return UpdateProfile(newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
      },
    }
  );

  const Submit = async (formData: FormData) => {
    console.log(formData);

    await mutation.mutate(formData);

    if (mutation.isSuccess) {
      setOpen(false);
      toast("Profile updated successfully");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" action={Submit}>
          <div>
            <Label htmlFor="username" className="">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              {...register("username", { required: "username required" })}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="Description">Description</Label>
            <Input
              id="Description"
              type="text"
              {...register("Description", { required: "Description required" })}
            />
            {errors.Description && (
              <p className="text-red-500">{errors.Description.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="Image">Profile Image</Label>

            <Input
              type="file"
              name="Image"
              {...register("Image", { required: "Image required" })}
            />

            {errors.Image && (
              <p className="text-red-500">{errors.Image.message}</p>
            )}
          </div>
          <Button type="submit">
            {mutation.isLoading ? "Saving.." : "Save"}
          </Button>
        </form>
        {mutation.isError && (
          <p className="text-red-500">Something went wrong</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
