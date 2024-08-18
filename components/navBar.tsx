"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BellRing, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SideBar from "./sideBar";

export default function Component() {
  const { data: session } = useSession();
  const [theme, setTheme] = useState<Boolean>(true);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme ? "light" : "dark");
    root.classList.add(theme ? "dark" : "light");
  }, [theme]);

  return (
    <header className="bg-background border-b px-4 md:px-6 flex items-center h-14 shrink-0  justify-between dark:text-white text-black">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image src={"/explore_12546374.png"} alt="" width={30} height={30} />
        <span className="text-xl font-bold">Explore</span>
      </Link>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setTheme(!theme)}
          className="rounded-full  dark:bg-primary dark:text-white bg-secondary border-none dark:bg-secondary-10  "
        >
          {!theme ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
        {session ? (
          <>
            <SideBar />
          </>
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
