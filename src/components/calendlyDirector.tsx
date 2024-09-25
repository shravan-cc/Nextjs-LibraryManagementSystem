"use client";
import { createAppointment } from "@/lib/action";
import { IAppointmentBase } from "@/models/appointment.model";
import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";

const Calendly = ({
  calendlyURL,
  professor,
  id,
}: {
  calendlyURL: string;
  professor: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    department: string | null;
    calendlylink: string;
  };
  id: number;
}) => {
  const [scheduledMeeting, setScheduledMeeting] = useState(null);

  useEffect(() => {
    const handleCalendlyEvent = async (e: any) => {
      if (e.data.event && e.data.event.indexOf("calendly") === 0) {
        if (e.data.event === "calendly.event_scheduled") {
          const appointmentData = e.data.payload;
          // Send this data to your server
          const insertingData = {
            memberId: id,
            professorId: professor.id,
            appointMentStartTime: appointmentData.event.start_time,
            appointMentEndTime: appointmentData.event.end_time,
            googleMeetLink: appointmentData.location?.join_url,
          };
          console.log("Appointments", insertingData);
          await createAppointment(insertingData);
        }
      }
    };

    window.addEventListener("message", handleCalendlyEvent);

    return () => {
      window.removeEventListener("message", handleCalendlyEvent);
    };
  }, [id, professor.id]);
  return (
    <div className="App">
      <InlineWidget url={calendlyURL} />
    </div>
  );
};

export default Calendly;
