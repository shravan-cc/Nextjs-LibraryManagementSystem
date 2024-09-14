import type { CustomSession, NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // Redirect to this page for sign-in
  },
  callbacks: {
    jwt({ token, user, profile }) {
      // console.log("JWT Token User: ", user);
      // console.log("JWT Token: ", token);
      if (user) {
        const userData = {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
        };
        token = { ...userData };
      }
      if (profile && profile.picture) {
        token.image = profile.picture;
      }
      return token;
    },
    session({ session, token }: { session: CustomSession; token: any }) {
      if (token) {
        session.user = token;
      }
      // console.log("Session: ", session);
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // console.log(auth);
      const user = auth?.user;
      // console.log("config", user);

      const paths = nextUrl.pathname;

      // Allow access to public routes (e.g., signup)
      const publicPaths = ["/", "/signup", "/login"]; // Add any other public paths here
      const isPublicPath = publicPaths.includes(paths);

      if (isPublicPath) {
        return true; // Allow access to public pages
      }

      if (!user) {
        return false;
      }

      // if (nextUrl.pathname === "/" && isLoggedIn) {
      //   const path = user.role === "admin" ? "/home" : "/user";
      //   return Response.redirect(new URL(path, nextUrl));
      // }

      const path = user.role === "admin" ? "/home" : "/user";
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
