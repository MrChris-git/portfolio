import Background from "@/components/background";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Chris | Personal Portfolio",
  description: "Chris is a junior developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full m-0 p-0">
        <Background>{children}</Background>
      </body>
    </html>
  );
}
