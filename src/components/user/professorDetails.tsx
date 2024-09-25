"use server";

import { ProfessorDetailsProps } from "@/lib/definition";
import { Badge } from "../ui/badge";
import { CardTitle } from "../ui/card";

export default async function ProfessorDetails({
  appointment,
}: {
  appointment: {
    startTime: string;
    endTime: string;
    gmeetLink: string;
    professorEmail: string;
    name: string;
    email: string;
    department: string;
  };
}) {
  return (
    <>
      <CardTitle className="text-lg font-bold text-orange-800 truncate">
        <span>{appointment.name}</span>
      </CardTitle>
      <Badge variant="secondary" className="bg-orange-200 text-orange-800">
        {appointment.department}
      </Badge>
    </>
  );
}

// {
//     professorName,
//     professorDept,
//   }: ProfessorDetailsProps
