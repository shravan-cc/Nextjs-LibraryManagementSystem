import SignUp from "@/components/auth/signup";
import GoogleAuth from "@/components/auth/GoogleAuth";

export default function SignUpPage() {
  return (
    <>
      <SignUp>
        <GoogleAuth />
      </SignUp>
    </>
  );
}
