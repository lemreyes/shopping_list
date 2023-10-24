import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { NextAuthProvider } from "./providers";

const qs = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "List Easy",
  description: "Plan your way to an easy shopping list.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Layout");

  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={`${qs.className}`}>{children}</body>
      </NextAuthProvider>
    </html>
  );
}
