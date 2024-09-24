"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useActionState, useReducer } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

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
              disabled={isPending}
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
              disabled={isPending}
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm font-medium">
              {errorMessage}
            </div>
          )}
          <Button type="submit" className="bg-CustomOrange">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("SigningIn")}
              </>
            ) : (
              t("Login")
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
