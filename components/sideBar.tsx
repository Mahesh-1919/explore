import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Sidebar,
  UserRoundPen,
  SquarePen,
  Bookmark,
  LibraryBig,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
  username: string;
};
export default function SheetDemo({ username }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-inherit text-black hover:bg-inherit hover:text-black/50">
          <Sidebar />
          <span className="hidden md:block mx-2">{username}</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[40vh]">
        <div className="my-5">
          <ul className="  font-medium">
            <li className=" py-2 px-4 hover:bg-slate-100 rounded-lg ">
              <SheetClose asChild>
                <Link href={"/profile"} className="flex gap-2 items-center">
                  <UserRoundPen size={20} />
                  <span>Profile</span>
                </Link>
              </SheetClose>
            </li>
            <li className=" py-2 px-4 hover:bg-slate-100 rounded-lg ">
              <SheetClose asChild>
                <Link href={"/NewBlog"} className="flex gap-2 items-center">
                  <SquarePen size={20} />
                  <span>Write</span>
                </Link>
              </SheetClose>
            </li>
            <li className=" py-2 px-4 hover:bg-slate-100 rounded-lg ">
              <SheetClose asChild>
                <Link href={"/stories"} className="flex gap-2 items-center">
                  <LibraryBig size={20} />
                  <span>Stories</span>
                </Link>
              </SheetClose>
            </li>
            <li className=" py-2 px-4 hover:bg-slate-100 rounded-lg ">
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
