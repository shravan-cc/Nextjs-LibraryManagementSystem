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
import { registerUser, State } from "@/lib/action";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

interface SignUpProps {
  children: React.ReactNode;
}

export default function SignUp({ children }: SignUpProps) {
  //   const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const formData = new FormData(e.target);
  //     const data = Object.fromEntries(formData.entries());
  //     console.log(data);
  //   };
  const router = useRouter();
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state.message === "Success") {
      router.push("/login");
    }
  }, [state.message, router]);
  return (
    <main>
      <div className="flex items-center justify-center min-h-screen bg-CustomPeach">
        <Card className="w-full max-w-md bg-CustomPeachCream">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              SignUp
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 px-16">
            <form action={formAction}>
              <div className="grid gap-3">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="firstName">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="lastName">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="lastName"
                    name="lastName"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="phone">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Phone no."
                    type="number"
                    name="phone"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="address">
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="Address"
                    type="text"
                    name="address"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
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
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="confirmPassword">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
                <Button type="submit" className="bg-CustomOrange">
                  Sign Up
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
              {/* <Button variant="outline" className="w-full max-w-52 flex gap-2">
                <Image
                  src="/Google.png"
                  alt="Google pic Image"
                  width={25}
                  height={25}
                />
                Sign in with Google
              </Button> */}
              {children}
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
  );
}
