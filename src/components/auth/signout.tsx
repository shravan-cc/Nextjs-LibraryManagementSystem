import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export default function SignOut() {
  return (
    <DropdownMenuItem>
      <form
        action={async () => {
          "use server";
          await signOut();
          console.log("Logged out");
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
