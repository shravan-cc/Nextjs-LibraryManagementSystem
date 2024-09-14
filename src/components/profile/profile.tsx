import { fetchUserDetails } from "@/lib/action";
import SignOut from "../auth/signout";
import ProfileHandler from "./profileHandler";

export default async function Profile() {
  const fetchedUserDetails = await fetchUserDetails();
  const userDetails = fetchedUserDetails?.userDetails;
  const user = fetchedUserDetails?.user;
  const userImage = user?.image || "/user.png";
  const profilePath =
    userDetails?.role === "admin" ? "/home/profile" : "/user/profile";
  // console.log("Details of user", userDetails);
  // console.log("In Profile", user?.role);
  // const editProfilePath =
  //   user?.role === "admin" ? "/home/editprofile" : "/user/editprofile";
  console.log(userImage);
  return (
    <div className="ml-auto">
      <ProfileHandler
        profilePath={profilePath}
        userDetails={userDetails}
        userImage={userImage}
      >
        <SignOut />
      </ProfileHandler>
    </div>
  );
}
