"use client";
import React, { useState } from "react";
import Password from "@/components/password";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { sendEmail } from "@/app/actions/mail";
import { updatePassword } from "@/app/actions/updatePassword";

interface Props {
  type: string;
  description?: string;
}

const Verify = ({ type, description }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<string>("0");
  const [verifyOtp, setVerifyOtp] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (otp !== verifyOtp) {
      setError("Invalid Otp");
      setIsLoading(false);
      return;
    } else if (password !== passwordConfirm) {
      setError("Password does not match");
      setIsLoading(false);
      return;
    } else if (type === "register") {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 201) {
        router.push("/login");
      } else {
        setError("Something Went Wrong");
        setIsLoading(false);
      }
    } else if (type === "forgot") {
      const res = await updatePassword(email, password);
      if (res) {
        router.push("/login");
      } else {
        setError("Something Went Wrong");
        setIsLoading(false);
      }
    }
  };

  const handleVerify = async (e: any) => {
    e.preventDefault();
    try {
      const resUserExists = await fetch("api/UserExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();
      if (resUserExists.status !== 200) {
        setError("Something Went Wrong");
        setIsLoading(false);
      }

      if (user && type === "register") {
        setError("User already exists");
        setIsLoading(false);
        return;
      } else if (!user && type === "register") {
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp);

        setOtp(otp.toString());

        const res: any = await sendEmail({ email, otp });
        if (res) {
          setError("Otp sent to your email");
        }
      } else if (type === "forgot" && user) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        setOtp(otp.toString());
        const res: any = await sendEmail({ email, otp });

        if (res) {
          setError("Otp sent to your email");
        }
      }
    } catch (error) {
      setError("Error during registration: ");
    }
  };

  return (
    <div className="flex justify-center h-[95vh] items-center md:bg-cover bg-center dark:bg-background ">
      <div
        className="w-full max-w-sm p-4  rounded-xl shadow sm:p-6 md:p-8 m-8  md:m-0 backdrop-blur-sm bg-secondary 
     "
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-center">{description}</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              username
            </label>
            <div className="flex gap-2">
              <Input
                type="email"
                name="email"
                id="email"
                className="  border border-black/10 dark:bg-black/30 text-sm rounded-xl block w-full p-2.5"
                placeholder="name@company.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handleVerify}>Verify</Button>
            </div>
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium mt-2"
            >
              Enter Otp
            </label>
            <Input
              type="text"
              id="otp"
              placeholder="Enter otp"
              value={verifyOtp || ""}
              onChange={(e: any) => setVerifyOtp(e.target.value)}
              className="border border-black/10 dark:bg-black/30 text-sm rounded-xl  block w-full p-2.5 "
            />
          </div>
          <Password
            password={passwordConfirm}
            setPassword={setPasswordConfirm}
            labels="Password"
          />
          <Password
            password={password}
            setPassword={setPassword}
            labels="Confirm Password"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-black dark:bg-white dark:text-black hover:bg-primary dark:hover:bg-white/90 "
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <div className="text-sm font-medium text-gray-500">
            Already Have An Account?
            <Link
              href={"/login"}
              className=" hover:underline text-primary px-2"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify;
