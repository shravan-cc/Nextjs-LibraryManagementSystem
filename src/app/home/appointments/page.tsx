import { Calendar, Clock, Video, Mail, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllAppointments } from "@/lib/action";

export default async function AdminAppointmentsCard() {
  const appointments = await getAllAppointments();
  const formatDate = (dateString: string) => {
    const [date, time] = dateString.split(" ");
    return `${date.split("-").reverse().join("/")} ${time}`;
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-800">
        Our Appointments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {appointments!.map((appointment) => (
          <Card
            key={appointment.id}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200 p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    {/* <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${appointment.professorName}`}
                  /> */}
                    <AvatarFallback>
                      {appointment.profname
                        .split(" ")
                        .map((n: any) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-bold text-orange-800">
                      {appointment.profname}
                    </CardTitle>
                    <p className="text-xs text-orange-600">
                      {appointment.professorEmail}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-orange-300 text-orange-800 px-2 py-1 text-xs"
                >
                  {appointment.profdept}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {appointment.name}
                  </p>
                  <p className="text-xs text-gray-600">{appointment.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-orange-600" />
                <span className="text-xs text-gray-700">
                  {formatDate(appointment.startTime)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-xs text-gray-700">
                  {appointment.startTime.split(" ")[1]} -{" "}
                  {appointment.endTime.split(" ")[1]}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Video className="h-4 w-4 text-orange-600" />
                <a
                  href={appointment.gmeetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Join Google Meet
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
