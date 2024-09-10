"use client";

import { useActionState, useEffect, useState } from "react";
import { addBook, registerUser, State } from "@/lib/action";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MemberForm() {
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(registerUser, initialState);
  const [showSuccessMessage, setSuccessMessage] = useState(false);
  useEffect(() => {
    if (state.message === "Success") {
      setSuccessMessage(true);
    }
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  }, [state.message]);
  return (
    <>
      <form
        action={formAction}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        {showSuccessMessage && <SuccessMessage />}
      </form>
    </>
  );
}

const SuccessMessage = () => (
  <Alert className="fixed bottom-4 right-4 w-96 bg-green-100 border-green-500 text-green-800 shadow-lg animate-in slide-in-from-right">
    <CheckCircle2 className="h-4 w-4" />
    <AlertTitle>Success</AlertTitle>
    <AlertDescription>
      Member added successfully to the library.
    </AlertDescription>
  </Alert>
);
