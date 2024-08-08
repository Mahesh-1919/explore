import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/authConfig";
import Verify from "@/components/verify";

export default async function Register() {
  return <Verify type="register" description="  Sign Up to our platform" />;
}
