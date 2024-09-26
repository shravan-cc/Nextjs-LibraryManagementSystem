"use client";
import { createAppointment } from "@/lib/action";
import { IAppointmentBase } from "@/models/appointment.model";
import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";

const Calendly = ({ calendlyURL }: { calendlyURL: string }) => {
  const primaryColor = "#f97316"; // Orange-500
  const textColor = "#7c2d12"; // Orange-900
  const backgroundColor = "#fff7ed"; // Orange-50
  return (
    <div className="App">
      <InlineWidget
        url={calendlyURL}
        styles={{
          height: "1000px",
          width: "100%",
        }}
        pageSettings={{
          backgroundColor: backgroundColor,
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: primaryColor,
          textColor: textColor,
        }}
      />
    </div>
  );
};

export default Calendly;
