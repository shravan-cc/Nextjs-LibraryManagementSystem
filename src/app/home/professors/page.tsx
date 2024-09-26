import { useState } from "react";
import { Trash2 } from "lucide-react";
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

export default async function AdminProfessorCard() {
  const professors = await getProfessors();
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-800">
        Manage Professors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {professors!.map((professor) => (
          <Card
            key={professor.id}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                  variant="secondary"
                  className="bg-orange-200 text-orange-800"
                >
                  {professor.department}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div>
                <h3 className="font-semibold text-orange-700 mb-1">Bio</h3>
                <p className="text-gray-700">{professor.bio}</p>
              </div>
            </CardContent>
            <CardFooter className="bg-orange-50 p-4">
              <Button
                variant="destructive"
                className="w-full bg-red-500 hover:bg-red-600 text-white"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Professor
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
