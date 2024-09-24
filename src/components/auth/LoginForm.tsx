"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useActionState, useReducer } from "react";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations("SignUp");
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <>
      <form action={formAction}>
        <div className="grid gap-3">
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
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm font-medium">
              {errorMessage}
            </div>
          )}
          <Button type="submit" className="bg-CustomOrange">
            {t("Login")}
          </Button>
        </div>
      </form>
    </>
  );
}
