"use client";

import { User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ProfileHandlerProps } from "@/lib/definition";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function ProfileHandler({
  profilePath,
  // editProfilePath,
  userDetails,
  userImage,
  children,
}: ProfileHandlerProps) {
  const [open, setOpen] = useState<boolean>(false);
  // const router = useRouter();
  // const pathName = usePathname();
  // if (pathName.startsWith("/user/profile")) {
  //   console.log("Round Profile");
  //   // router.refresh();
  // }
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userDetails!.firstName}
                  width={128}
                  height={128}
                />
              ) : (
                <AvatarFallback className="bg-orange-200 text-orange-800">
                  {`${userDetails?.firstName} ${userDetails?.lastName}`}
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {userDetails?.firstName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userDetails?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div onClick={() => setOpen(false)}>
              <Link className="flex" href={profilePath}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>
            <div onClick={() => setOpen(false)}>
              <Link className="flex" href={editProfilePath}>
                <User className="mr-2 h-4 w-4" />
                <span>Edit Profile</span> 
              </Link>
            </div>
          </DropdownMenuItem> */}
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
