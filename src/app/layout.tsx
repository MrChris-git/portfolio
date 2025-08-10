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
    <html lang="en" className="h-lvh w-1vw">
      <body className="h-screen w-screen m-0 p-0">
        <Background>{children}</Background>
      </body>
    </html>
  );
}
