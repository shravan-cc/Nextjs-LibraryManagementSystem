import ViewProfile from "@/components/profile/viewProfile";
import { fetchUserDetails } from "@/lib/action";

export default async function Profile() {
  const fetchedUserDetails = await fetchUserDetails();
  const userDetails = fetchedUserDetails?.userDetails;
  const user = fetchedUserDetails?.user;
  const userImage = user?.image || "/user.png";
  return (
    <>
      <ViewProfile userDetails={userDetails} userImage={userImage} />
    </>
  );
}
