"use client";

import { AppointmentsCardProps } from "@/lib/definition";
import { Calendar, CalendarX, Clock, Video } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CancelAppointment from "./appointmentCancel";
import Link from "next/link";

export default function AppointmentsCard({
  appointments,
}: AppointmentsCardProps) {
  const formatDate = (dateString: string) => {
    return dateString.split(" ")[0] + " " + dateString.split(" ")[1];
  };

  const formatTime = (dateString: string) => {
    return dateString.split(" ")[2] + " " + dateString.split(" ")[3];
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.length === 0 ? (
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-8 text-center">
              <CalendarX className="h-16 w-16 mx-auto text-orange-300 mb-4" />
              <CardTitle className="text-2xl font-bold text-orange-800 mb-2">
                No Appointments
              </CardTitle>
              <p className="text-orange-600 mb-6">
                You dont have any scheduled appointments at the moment.
              </p>
              <Link href="/user/professors">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Book an Appointment
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          appointments.map((appointment, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <CardHeader className="bg-orange-100 p-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold text-orange-800 truncate">
                    <span>{appointment.profname}</span>
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-orange-200 text-orange-800 px-2 py-1"
                  >
                    {appointment.profdept}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 mr-3 text-orange-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {formatDate(appointment.startTime)}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 mr-3 text-orange-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {formatTime(appointment.startTime)} -{" "}
                    {formatTime(appointment.endTime)}
                  </span>
                </div>
                <div className="flex items-center pt-4 border-t border-orange-200">
                  <Video className="h-5 w-5 mr-3 text-orange-600 flex-shrink-0" />
                  <a
                    href={appointment.gmeetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline truncate flex-grow"
                  >
                    Join Google Meet
                  </a>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-orange-50 flex justify-between">
                <Link
                  href={`/user/appointments/reschedule?url=${encodeURIComponent(
                    appointment.reschedule_url
                  )}`}
                >
                  <Button
                    variant="outline"
                    className="text-orange-600 border-orange-600 hover:bg-orange-100"
                  >
                    Reschedule
                  </Button>
                </Link>
                <CancelAppointment
                  eventUuid={appointment.event_uuid}
                  profName={appointment.profname}
                />
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
