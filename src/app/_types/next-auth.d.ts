import { Session } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: number | null;
    name?: string | null;
    email?: string | null;
    role?: string | null;
  }

  interface CustomSession extends Session {
    user?: User;
  }
}
