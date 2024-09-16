import { signIn } from "@/auth";
import { GoogleAuthProps } from "@/lib/definition";
import Image from "next/image";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default function GoogleAuth({ buttonLabel }: GoogleAuthProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/user" });
      }}
    >
      <Button variant="outline" className="w-full max-w-52 flex gap-2">
        <Image
          src="/Google.png"
          alt="Google pic Image"
          width={25}
          height={25}
        />
        {buttonLabel}
      </Button>
    </form>
  );
}
