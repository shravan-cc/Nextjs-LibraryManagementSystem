import ViewProfile from "@/components/profile/viewProfile";
import { fetchUserDetails } from "@/lib/action";

export default async function Profile() {
  const fetchedUserDetails = await fetchUserDetails();
  const userDetails = fetchedUserDetails?.userDetails;
  const user = fetchedUserDetails?.user;
  console.log("Inside function", user?.image);

  const userImage = user?.image
    ? user.image
    : userDetails?.imageURL
    ? userDetails.imageURL
    : "/user.png";
  return (
    <>
      <ViewProfile
        userDetails={userDetails}
        userImage={userImage}
        user={user}
      />
    </>
  );
}
