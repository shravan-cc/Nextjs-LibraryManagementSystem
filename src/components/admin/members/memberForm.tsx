"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser, State } from "@/lib/action";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function MemberForm() {
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(registerUser, initialState);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: "Success",
        description: "Member added successfully to the library.",
        duration: 1500,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
      router.push("/home/members");
    } else if (state.message && state.message !== "Success") {
      toast({
        title: "Failure",
        description: `${state.message}`,
        duration: 5000,
        className: "bg-red-100 border-red-500 text-red-800 shadow-lg",
      });
    }
  }, [state.message, toast, router]);
  return (
    <>
      <form
        action={formAction}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <div>
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
            {state.errors?.firstName ? (
              <p className="text-red-500 text-sm">{state.errors.firstName}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
            {state.errors?.lastName ? (
              <p className="text-red-500 text-sm">{state.errors.lastName}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter Phone number"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
            {state.errors?.phone ? (
              <p className="text-red-500 text-sm">{state.errors.phone}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
          </div>
          <div>
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address
            </Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Enter Address"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
            {state.errors?.address ? (
              <p className="text-red-500 text-sm">{state.errors.address}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
          </div>
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
            {state.errors?.email ? (
              <p className="text-red-500 text-sm">{state.errors.email}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
          </div>
          <div>
            <Label htmlFor="role" className="text-sm font-medium text-gray-700">
              Role
            </Label>
            <Input
              id="role"
              name="role"
              type="text"
              placeholder="Enter Role"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
            {state.errors?.role ? (
              <p className="text-red-500 text-sm">{state.errors.role}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
          </div>
          <div>
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
            {state.errors?.password ? (
              <p className="text-red-500 text-sm">{state.errors.password}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Link href="/home/books">
            <Button
              type="button"
              variant="outline"
              className="bg-white hover:bg-gray-100 text-gray-800"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Add Member
          </Button>
        </div>
      </form>
    </>
  );
}
