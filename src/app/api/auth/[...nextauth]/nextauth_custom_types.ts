import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
      userDataId?: number;
    }
  
    interface Session extends DefaultSession {
      user?: User;
    }
  }