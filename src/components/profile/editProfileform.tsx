"use client";

import { editMember, State } from "@/lib/action";
import { IMember } from "@/models/member.model";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useToast } from "../hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function EditProfileForm({
  userDetails,
}: {
  userDetails: IMember | undefined;
}) {
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(editMember, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const path =
    userDetails?.role === "admin" ? "/home/profile" : "/user/profile";

  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: "Success",
        description: "Member edited successfully from the library.",
        duration: 1500,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
      router.push(path);
    }
  }, [state.message, toast, router, path]);
  return (
    <>
      <form action={formAction} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-orange-600">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-orange-800">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                defaultValue={userDetails!.firstName}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-orange-800">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                defaultValue={userDetails!.lastName}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-orange-800">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                {...(userDetails?.phone
                  ? { defaultValue: userDetails.phone }
                  : {})}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-orange-800">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                defaultValue={userDetails!.email}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-orange-800">
              Address
            </Label>
            <Textarea
              id="address"
              name="address"
              className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 "
              defaultValue={userDetails!.address}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          Save Changes
        </Button>
      </form>
    </>
  );
}
