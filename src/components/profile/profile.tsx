import { fetchUserDetails } from "@/lib/action";
import SignOut from "../auth/signout";
import ProfileHandler from "./profileHandler";

export default async function Profile() {
  const fetchedUserDetails = await fetchUserDetails();
  const userDetails = fetchedUserDetails?.userDetails;
  console.log("Hi user", userDetails);
  const user = fetchedUserDetails?.user;
  console.log("Inside function", user?.image);
  const userImage = user?.image
    ? user.image
    : userDetails?.imageURL
    ? userDetails.imageURL
    : "/user.png";
  const profilePath =
    userDetails?.role === "admin" ? "/home/profile" : "/user/profile";
  // console.log("Details of user", userDetails);
  // console.log("In Profile", user?.role);
  // const editProfilePath =
  //   user?.role === "admin" ? "/home/editprofile" : "/user/editprofile";
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
