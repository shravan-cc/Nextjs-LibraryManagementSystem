import GoogleAuth from "@/components/auth/GoogleAuth";
import SignUpForm from "@/components/auth/SignupForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <main>
        <div className="flex items-center justify-center min-h-screen bg-CustomPeach">
          <Card className="w-full max-w-md bg-CustomPeachCream">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                SignUp
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 px-16">
              <SignUpForm />

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
                <GoogleAuth buttonLabel="Sign in with Google" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="px-8 text-center text-sm text-black">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-CustomDarkOrange hover:text-primary"
                >
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
