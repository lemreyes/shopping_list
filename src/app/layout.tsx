import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { NextAuthProvider } from "./providers";

const qs = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "List Easy",
  description: "Plan your way to an easy shopping list.",
  icons: {
    icon: "/assets/favicon96.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={`${qs.className}`}>{children}</body>
      </NextAuthProvider>
    </html>
  );
}
