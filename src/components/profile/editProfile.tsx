import { fetchUserDetails } from "@/lib/action";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import EditProfileForm from "./editProfileform";
import { getTranslations } from "next-intl/server";

export default async function EditProfile() {
  const t = await getTranslations("EditProfile");
  const fetchedUserDetails = await fetchUserDetails();
  const userDetails = fetchedUserDetails?.userDetails;
  const user = fetchedUserDetails?.user;
  const userImage = user?.image
    ? user.image
    : userDetails?.imageURL
    ? userDetails.imageURL
    : "/user.png";
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-orange-800 text-center">
        {t("Edit Profile")}
      </h2>
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-400 to-orange-600">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-white">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userDetails!.firstName}
                  width={128}
                  height={128}
                />
              ) : (
                <AvatarFallback className="bg-orange-200 text-orange-800">
                  {`${userDetails?.firstName.charAt(
                    0
                  )} ${userDetails?.lastName.charAt(0)}`}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-2xl text-white">{`${userDetails?.firstName} ${userDetails?.lastName}`}</CardTitle>
              <p className="text-sm text-orange-100">{userDetails?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-6">
          <EditProfileForm userDetails={userDetails} />
        </CardContent>
      </Card>
    </div>
  );
}
