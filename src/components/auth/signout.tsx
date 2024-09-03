import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function SignOut() {
  return (
    <DropdownMenuItem>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <Button type="submit">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </Button>
      </form>
    </DropdownMenuItem>
  );
}
