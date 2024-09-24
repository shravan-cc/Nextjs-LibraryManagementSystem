import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SignOut() {
  const t = useTranslations("Profile");
  return (
    <DropdownMenuItem>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <Button type="submit" className="bg-CustomOrange">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("Logout")}</span>
        </Button>
      </form>
    </DropdownMenuItem>
  );
}
