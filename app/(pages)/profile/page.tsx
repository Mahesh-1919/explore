"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import EditProfile from "@/components/EditProfile";
import { useQuery } from "react-query";

export default function Component() {
  const { data: profileData } = useQuery("profile", async () => {
    const res = await fetch("/api/getProfile");
    return res.json();
  });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <main className="flex-1 p-6 md:p-12 w-full">
        <div className="mx-auto max-w-3xl  space-y-8 bg-black/10 dark:bg-secondary/50 p-4 rounded-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={profileData?.profile_picture}
                  alt="@username"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <h1 className="text-xl md:text-2xl font-bold">
                  {profileData?.username}
                </h1>
                <p className="text-muted-foreground">Software Engineer</p>
              </div>
            </div>
            <div className="prose prose-gray dark:prose-invert">
              <p>{profileData?.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <EditProfile />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
