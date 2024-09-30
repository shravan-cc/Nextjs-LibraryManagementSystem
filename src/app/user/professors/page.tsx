import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getInviteeDetails,
  fetchUserDetails,
  getEventUuid,
  getProfessors,
  getScheduledEvents,
  getUserAppointments,
  getAllAppointments,
} from "@/lib/action";
import Link from "next/link";
import Razorpay from "@/components/admin/professors/makepayments";

export default async function ProfessorsPage() {
  const professors = await getProfessors();
  const userDetails = await fetchUserDetails();
  const memberName: string = `${userDetails?.userDetails.firstName} ${userDetails?.userDetails.lastName}`;
  const memberEmail = userDetails?.userDetails.email;
  const memberPhoneNumber = userDetails?.userDetails.phone;
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-800">
        Our Professors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {professors!
          .filter((professor) => professor.status === "accepted")
          .map((professor) => (
            <Card
              key={professor.id}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="bg-orange-100">
                <CardTitle className="text-xl font-bold text-orange-800">
                  {professor.name}
                </CardTitle>
                <p className="text-sm text-orange-600">
                  {professor.department}
                </p>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 ">{professor.bio}</p>
              </CardContent>
              <CardFooter className="bg-orange-50 p-4">
                {/* <Link
                href={`/user/professors/${
                  professor.id
                }?name=${encodeURIComponent(
                  memberName
                )}&email=${encodeURIComponent(memberEmail!)}`}
                className="w-full"
              >
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Book Appointment
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link> */}
                <Razorpay
                  professor={professor}
                  memberName={memberName}
                  memberEmail={memberEmail}
                  memberPhoneNumber={memberPhoneNumber}
                />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
