"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/action";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

export default function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("In log in");
  //   const result = await signIn("credentials", {
  //     email,
  //     password,
  //     redirect: false,
  //   });
  //   if (result?.ok) {
  //     console.log("Success");
  //     router.push("/home");
  //   } else {
  //     console.log("Error while login in");
  //   }
  // };
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <main>
      <div className="flex items-center justify-center min-h-screen bg-CustomPeach">
        <Card className="w-full max-w-md bg-CustomPeachCream">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 px-16">
            <form action={formAction}>
              <div className="grid gap-3">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    name="email"
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
                    name="password"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
                <Button type="submit" className="bg-CustomOrange">
                  Login
                </Button>
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
              <Button variant="outline" className="w-full max-w-52 flex gap-2">
                <Image
                  src="/Google.png"
                  alt="Google pic Image"
                  width={25}
                  height={25}
                />
                Login with Google
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
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
