"use client";

import { CardHeader } from "../ui/card";

export default function ProfessorHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CardHeader className="bg-orange-100">
      <div className="flex justify-between items-center">{children}</div>
    </CardHeader>
  );
}
