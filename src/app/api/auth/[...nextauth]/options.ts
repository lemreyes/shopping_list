import type { NextAuthOptions, Session } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "../../../Utilities/prismaUtils";
import { Themes } from "@/app/Types/Enums";

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
    CredentialsProvider({
      id: "guest",
      name: "guest_login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "guest" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: "88888888",
          name: "Guest",
          email: "guest@guest.com",
        };
        console.log("credentials", credentials);
        console.log("req", req);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    createUser: async (message) => {
      const theme: Themes = Themes.ThemeLight;
      const userData = await prisma.userData.create({
        data: {
          email: message.user.email as string,
          name: message.user.name as string,
          image: message.user.image as string,
          theme: theme as number,
        },
      });
    },
  },
  pages: {
    signIn: "/Auth/Login",
  },
  callbacks: {
    async session({ session }: { session: Session; token: any; user: any }) {
      console.log("Session: ", session);
      if (session.user != undefined || session.user != null) {
        const userData = await prisma.userData.findUnique({
          where: {
            email: session.user.email as string,
          },
        });
        // Assign userDataId to the custom user type
        session.user = {
          ...session.user,
          userDataId: userData?.id as number,
        };
      }
      return session;
    },
  },
};
