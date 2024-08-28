import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardContent,
  CardFooter,
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { roboto } from "../layout";

export default function Login() {
  return (
    <main>
      <div className="flex items-center justify-center min-h-screen bg-CustomPeach">
        <Card className="w-full max-w-md bg-CustomPeachCream">
          <CardHeader className="space-y-1">
            <CardTitle
              className={`text-2xl font-bold text-center ${roboto.className}`}
            >
              Login
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 px-16">
            <form>
              <div className="grid gap-3">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
                <Button className="bg-CustomOrange">Login</Button>
              </div>
            </form>

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
              <Button variant="outline" className="w-full max-w-52">
                Google
              </Button>
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
  );
}
