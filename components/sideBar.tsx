import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Avatar from "./avatar";
import { UserRoundPen, SquarePen, Bookmark, LibraryBig } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuery } from "react-query";

type Props = {};
export default function SheetDemo(props: Props) {
  const { data } = useQuery("profile", async () => {
    const res = await fetch("/api/getProfile");
    return res.json();
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-inherit text-black hover:bg-inherit hover:text-black/50 dark:text-white">
          <Avatar imgaeUrl={data?.profile_picture} />
          <span className="hidden md:block mx-2">{data?.username}</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[40vh] dark:text-white ">
        <div className="my-5">
          <ul className="  font-medium">
            <li className=" py-2 px-4 hover:bg-slate-100 rounded-lg dark:hover:text-black">
              <SheetClose asChild>
                <Link href={"/profile"} className="flex gap-2 items-center">
                  <UserRoundPen size={20} />
                  <span>Profile</span>
                </Link>
              </SheetClose>
            </li>
            <li className=" py-2 px-4 hover:bg-slate-100 rounded-lg dark:hover:text-black ">
              <SheetClose asChild>
                <Link href={"/NewBlog"} className="flex gap-2 items-center">
                  <SquarePen size={20} />
                  <span>Write</span>
                </Link>
              </SheetClose>
            </li>
            <li className=" py-2 px-4 hover:bg-slate-100 rounded-lg dark:hover:text-black ">
              <SheetClose asChild>
                <Link href={"/stories"} className="flex gap-2 items-center">
                  <LibraryBig size={20} />
                  <span>Stories</span>
                </Link>
              </SheetClose>
            </li>
            <li className=" py-2 px-4 hover:bg-slate-100 rounded-lg dark:hover:text-black ">
              <SheetClose asChild>
                <Link href={"/favourites"} className="flex gap-2 items-center">
                  <Bookmark size={20} />
                  <span>Favourites</span>
                </Link>
              </SheetClose>
            </li>
          </ul>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={(e) => signOut()}>
              LogOut
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
