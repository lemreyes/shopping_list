import type { NextAuthOptions } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import prisma from "../../../Utilities/prismaUtils";

let userAccount: any = null;

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    createUser: async (message) => {
      const userData = await prisma.userData.create({
        data: {
          email: message.user.email as string,
          name: message.user.name as string,
          image: message.user.image as string,
        },
      });
    },
  },
  pages: {
    signIn: "/Auth/Login",
  },
};
