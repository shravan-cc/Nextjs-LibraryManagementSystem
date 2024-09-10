import { Parentheses } from "lucide-react";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // Redirect to this page for sign-in
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const user = auth?.user;

      // const paths = nextUrl.pathname;

      // // Allow access to public routes (e.g., signup)
      // const publicPaths = ["/", "/signup", "/login"]; // Add any other public paths here
      // const isPublicPath = publicPaths.includes(paths);

      // if (isPublicPath) {
      //   return true; // Allow access to public pages
      // }

      if (!user) {
        return false;
      }
      const path = user.email === "shravan@gmail.com" ? "/home" : "/user";
      const isOnDashboard = nextUrl.pathname.startsWith(path);
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL(path, nextUrl));
      }
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   console.log("url", url);
    //   console.log("baseUrl", baseUrl);
    //   return url.startsWith(baseUrl) ? baseUrl + "/home" : url;
    // },
  },
  providers: [],
} satisfies NextAuthConfig;
