"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser, State } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function SignUpForm() {
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
    <>
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
    </>
  );
}
