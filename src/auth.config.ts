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
      // console.log("Session in auth.config.ts: ", session);
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // console.log(auth);
      const user = auth?.user;
      const isAdmin = auth?.user?.role === "admin";
      // console.log("config", user);

      // const paths = nextUrl.pathname;

      // // Allow access to public routes (e.g., signup)
      // const publicPaths = ["/", "/signup", "/login", "/seed"]; // Add any other public paths here
      // const isPublicPath = publicPaths.includes(paths);

      // if (isPublicPath) {
      //   return true; // Allow access to public pages
      // }

      const path = isAdmin ? "/home" : "/user";
      const isOnDashboard = nextUrl.pathname.startsWith(path);
      console.log("Hello");
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        console.log("Logged In");
        return Response.redirect(new URL(path, nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
