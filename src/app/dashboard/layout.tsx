import Background from "@/components/background";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full m-0 p-0">
        <div
          id="background"
          className={`min-h-screen flex flex-col m-0 p-0 bg-white dark:bg-[#1a1a1a]`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
