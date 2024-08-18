import type { Metadata } from "next";
import { Providers } from "./provider";

import "./globals.css";
import NavBar from "@/components/navBar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Explore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className="h-screen">
          <NavBar />
          <div className="h-full overflow-y-auto dark:bg-background" >{children}</div>
          <Toaster richColors />
        </body>
      </Providers>
    </html>
  );
}
