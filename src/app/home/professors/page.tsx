import { useState } from "react";
import { ExternalLink, Plus, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProfessors } from "@/lib/action";
import AddProfessor from "@/components/admin/professors/addProfessor";
import RefreshProfessor from "@/components/admin/professors/refreshprofessor";
import Link from "next/link";

export default async function AdminProfessorCard() {
  const professors = await getProfessors();
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-800">
          Manage Professors
        </h1>
        <AddProfessor />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {professors!.map((professor) => (
          <Card
            key={professor.id}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <CardHeader className="bg-orange-100 relative">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold text-orange-800">
                    {professor.name}
                  </CardTitle>
                  <p className="text-sm text-orange-600">{professor.email}</p>
                </div>
                <Badge
                  variant={
                    professor.status === "Active" ? "default" : "secondary"
                  }
                  className={`${
                    professor.status === "Active"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {professor.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 flex-grow">
              <div className="mb-4">
                <h3 className="font-semibold text-orange-700 mb-1">
                  Department
                </h3>
                <p className="text-gray-700">{professor.department}</p>
              </div>
              <div>
                <h3 className="font-semibold text-orange-700 mb-1">Bio</h3>
                <p className="text-gray-700">{professor.bio}</p>
              </div>
            </CardContent>
            <CardFooter className="bg-orange-50 p-4 flex flex-wrap gap-2">
              <RefreshProfessor professorEmail={professor.email} />
              {professor.calendlylink !== "" ? (
                <Link href={professor.calendlylink}>
                  <Button
                    variant="outline"
                    className="flex-1 min-w-[calc(50%-0.25rem)]"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Calendly Link
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  className="flex-1 min-w-[calc(50%-0.25rem)]"
                  disabled
                >
                  No Calendly Link
                </Button>
              )}
              <Button
                variant="destructive"
                className="flex-1 bg-red-500 hover:bg-red-600 text-white w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
