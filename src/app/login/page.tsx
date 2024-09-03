import GoogleAuth from "@/components/auth/GoogleAuth";
import LoginForm from "@/components/auth/LoginForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      {/* <Login>
        <GoogleAuth buttonLabel="Login with Google" />
      </Login> */}
      <main>
        <div className="flex items-center justify-center min-h-screen bg-CustomPeach">
          <Card className="w-full max-w-md bg-CustomPeachCream">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Login
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 px-16">
              <LoginForm />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-black">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <GoogleAuth buttonLabel="Login in with Google" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="px-8 text-center text-sm text-black">
                Do not have an account??{" "}
                <Link
                  href="/signup"
                  className="text-CustomDarkOrange hover:text-primary"
                >
                  Signup
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
