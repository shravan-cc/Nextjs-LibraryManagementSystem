import { fetchUserDetails } from "@/lib/action";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import EditProfileForm from "@/components/profile/editProfileform";
import EditProfile from "@/components/profile/editProfile";

export default async function EditProfilePage() {
  return (
    <>
      <EditProfile />
    </>
  );
}
