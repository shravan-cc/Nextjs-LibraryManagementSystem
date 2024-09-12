import EditProfile from "@/components/profile/editProfile";
import EditProfileForm from "@/components/profile/editProfileform";
import { fetchUserDetails } from "@/lib/action";

export default async function EditProfilePage() {
  return (
    <>
      <EditProfile />
    </>
  );
}
