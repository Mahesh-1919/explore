"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SearchBar from "./searchBar";

import SideBar from "./sideBar";

export default function Component() {
  const { data: session } = useSession();

  return (
    <header className="bg-background border-b px-4 md:px-6 flex items-center h-14 shrink-0 sticky top-0 z-10 justify-between">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image src={"/explore_12546374.png"} alt="" width={30} height={30} />
        <span className="text-xl font-bold">Explore</span>
      </Link>
      <SearchBar placeholder={"Enter Recipe"} />

      <div className="flex items-center gap-2">
        {session ? (
          <SideBar username={session?.user?.name} />
        ) : (
          <>
            <Link href={"/login"}>
              <Button variant="outline">Sign in</Button>
            </Link>
            <Link href={"/register"}>
              <Button>Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
