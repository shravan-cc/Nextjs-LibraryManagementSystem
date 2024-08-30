import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // Redirect to this page for sign-in
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/home");

      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/home", nextUrl));
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
