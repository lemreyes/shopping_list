import type { NextAuthOptions } from "next-auth";

let userAccount: any = null;

export const options: NextAuthOptions = {
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
};
