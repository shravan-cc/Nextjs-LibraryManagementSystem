import { signIn } from "@/auth";
import { Button } from "../ui/button";
import Image from "next/image";

export default function GoogleAuth() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="outline" className="w-full max-w-52 flex gap-2">
        <Image
          src="/Google.png"
          alt="Google pic Image"
          width={25}
          height={25}
        />
        Sign in with Google
      </Button>
    </form>
  );
}
