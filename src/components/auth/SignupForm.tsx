"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser, State } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useToast } from "../hooks/use-toast";
import { useTranslations } from "next-intl";

export default function SignUpForm() {
  const t = useTranslations("SignUp");
  const router = useRouter();
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(registerUser, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: "Success",
        description: "Registration successful! Your account has been created.",
        duration: 1500,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
      router.push("/login");
    } else if (state.message && state.message !== "Success") {
      toast({
        title: "Failure",
        description: `${state.message}`,
        duration: 5000,
        className: "bg-red-100 border-red-500 text-red-800 shadow-lg",
      });
    }
  }, [state.message, router, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formAction(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="firstName">
              {t("First Name")}
            </Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder={t("First Name")}
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              required
            />
            {state.errors?.firstName && (
              <p className="text-red-500 text-sm">{state.errors.firstName}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="lastName">
              {t("Last Name")}
            </Label>
            <Input
              id="lastName"
              placeholder={t("Last Name")}
              name="lastName"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
            />
            {state.errors?.lastName && (
              <p className="text-red-500 text-sm">{state.errors.lastName}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="phone">
              {t("Phone Number")}
            </Label>
            <Input
              id="phone"
              placeholder={t("Phone Number")}
              type="number"
              name="phone"
              autoCapitalize="none"
              autoCorrect="off"
            />
            {state.errors?.phone && (
              <p className="text-red-500 text-sm">{state.errors.phone}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="address">
              {t("Address")}
            </Label>
            <Input
              id="address"
              placeholder={t("Address")}
              type="text"
              name="address"
              autoCapitalize="none"
              autoCorrect="off"
            />
            {state.errors?.address && (
              <p className="text-red-500 text-sm">{state.errors.address}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              {t("Email")}
            </Label>
            <Input
              id="email"
              placeholder={t("Email")}
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
            {state.errors?.email && (
              <p className="text-red-500 text-sm">{state.errors.email}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              {t("Password")}
            </Label>
            <Input
              id="password"
              placeholder={t("Password")}
              name="password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
            />
            {state.errors?.password && (
              <p className="text-red-500 text-sm">{state.errors.password}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="confirmPassword">
              {t("Confirm Password")}
            </Label>
            <Input
              id="confirmPassword"
              placeholder={t("Confirm Password")}
              name="confirmPassword"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <Button type="submit" className="bg-CustomOrange">
            {t("SignUp")}
          </Button>
        </div>
      </form>
    </>
  );
}
