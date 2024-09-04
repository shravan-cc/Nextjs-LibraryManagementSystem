import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import SignOut from "../auth/signout";
import { Button } from "@/components/ui/button";
import { fetchUserDetails } from "@/lib/action";
import Image from "next/image";

export default async function Profile() {
  const fetchedUserDetails = await fetchUserDetails();
  const userDetails = fetchedUserDetails?.userDetails;
  const user = fetchedUserDetails?.user;
  const userImage = user?.image || "/user.png";
  console.log(userImage);
  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <Image src={userImage} alt="User" width={32} height={32} />
              <AvatarFallback>JD</AvatarFallback>
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
            <User className="mr-2 h-4 w-4" />
            <span>View Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </DropdownMenuItem>
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
