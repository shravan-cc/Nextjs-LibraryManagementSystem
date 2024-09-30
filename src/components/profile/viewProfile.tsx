import { fetchBooksByMember, fetchTotalBooksOfMember } from "@/lib/action";
import {
  InfoItemProps,
  ProfileSectionProps,
  StatCardProps,
  ViewProfileProps,
} from "@/lib/definition";
import { BookOpen, Edit, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { getTranslations } from "next-intl/server";

export default async function ViewProfile({
  userDetails,
  userImage,
  user,
}: ViewProfileProps) {
  const t = await getTranslations("ViewProfile");
  const pendingRequests = await fetchBooksByMember();
  if (!pendingRequests) {
    throw new Error("Books not found");
  }
  const borrowedBooks = pendingRequests.filter(
    (book) => book.status === "approved"
  );

  const totalBorrowed = await fetchTotalBooksOfMember();
  const totalBorrowedBooks = totalBorrowed?.filter(
    (book) => book.status === "approved" || book.status === "Returned"
  );
  // console.log("Profile", user?.role);
  // console.log("USerDetails in view Profile", userDetails?.role);
  const path =
    userDetails?.role === "user" ? "/user/editprofile" : "/home/editprofile";
  console.log("In View Profile", path);
  return (
    <>
      {/* <h2 className="text-3xl font-bold text-orange-800 text-center mb-8">
        Member Profile
      </h2> */}
      <Card className="w-full max-w-3xl mx-auto overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-32"></div>
        <CardHeader className="relative">
          <div className="absolute -top-16 left-6">
            <Avatar className="sm:h-32 sm:w-32 h-24 w-24 border-4 border-white shadow-xl">
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
          </div>
          <div className="ml-32 sm:ml-40 pt-2 flex flex-col sm:flex-row justify-between items-start">
            <div>
              <h3 className="sm:text-2xl text-xl font-bold text-gray-800">{`${userDetails?.firstName} ${userDetails?.lastName}`}</h3>
              <p className="text-sm text-muted-foreground">{user?.role}</p>
              <p className="text-sm text-muted-foreground">
                {t("Member ID")} #{userDetails?.id}
              </p>
            </div>
            <Link href={path} className="mt-4 sm:mt-0">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white sm:w-auto">
                <Edit className="w-4 h-4 mr-2" />
                {t("Edit Profile")}
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 px-6">
          <ProfileSection
            title={t("Contact Information")}
            icon={<User className="h-5 w-5 text-orange-500" />}
          >
            <InfoItem
              icon={<Mail className="h-4 w-4" />}
              text={userDetails!.email}
            />
            <InfoItem
              icon={<Phone className="h-4 w-4" />}
              text={userDetails!.phone}
            />
            <InfoItem
              icon={<MapPin className="h-4 w-4" />}
              text={userDetails!.address}
            />
          </ProfileSection>

          <ProfileSection
            title={t("Library Activity")}
            icon={<BookOpen className="h-5 w-5 text-orange-500" />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                title={t("Books Borrowed")}
                value={totalBorrowedBooks!.length}
                icon={<BookOpen className="h-8 w-8 text-orange-500" />}
              />
              <StatCard
                title={t("Currently Borrowed")}
                value={borrowedBooks.length}
                icon={<BookOpen className="h-8 w-8 text-orange-500" />}
              />
              <StatCard
                title={t("Pending Requests")}
                value={pendingRequests!.length}
                icon={<BookOpen className="h-8 w-8 text-orange-500" />}
              />
            </div>
          </ProfileSection>
        </CardContent>
      </Card>
    </>
  );
}

function ProfileSection({ title, icon, children }: ProfileSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        {icon}
        <h4 className="text-lg font-semibold text-orange-800">{title}</h4>
      </div>
      <div className="bg-orange-50 p-4 rounded-lg">{children}</div>
    </div>
  );
}

function InfoItem({ icon, text }: InfoItemProps) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className="text-orange-500">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
      <div className="bg-orange-100 p-2 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-orange-600">{value}</p>
      </div>
    </div>
  );
}
