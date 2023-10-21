import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { NextAuthProvider } from "./providers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "./Utilities/prismaUtils";
import { options } from "./api/auth/[...nextauth]/options";
import { getThemeClassName } from "./Utilities/ThemeUtils";
import { Themes } from "./Types/Enums";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "List Easy",
  description: "Plan your way to an easy shopping list.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (session === null) {
    redirect("/Auth/Login");
  }

  // find user data
  const userData = await prisma.userData.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={`${inter.className} ${getThemeClassName(userData?.theme as Themes)} bg-bodyBg`}>
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
