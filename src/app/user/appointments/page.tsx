import AppointmentsCard from "@/components/user/appointmentscard";
import { getProfessorByEmail, getUserAppointments } from "@/lib/action";

// Mock data for appointments with the new structure
// const appointments = [
//   {
//     startTime: "Friday, 2024-09-27 10:00 AM",
//     endTime: "Friday, 2024-09-27 10:30 AM",
//     gmeetLink:
//       "https://calendly.com/events/427d16a9-31cb-4cdf-88bf-e41489fd0a49/google_meet",
//     professorEmail: "emily.johnson@codecraft.co.in",
//     name: "Dr. Emily Johnson",
//     email: "student1@gmail.com",
//     department: "Computer Science",
//   },
//   {
//     startTime: "Monday, 2024-09-30 14:00 PM",
//     endTime: "Monday, 2024-09-30 14:30 PM",
//     gmeetLink:
//       "https://calendly.com/events/123abc-45de-67fg-89hi-jklmnopqrstu/google_meet",
//     professorEmail: "michael.chen@codecraft.co.in",
//     name: "Prof. Michael Chen",
//     email: "student2@gmail.com",
//     department: "Literature",
//   },
//   {
//     startTime: "Wednesday, 2024-10-02 11:00 AM",
//     endTime: "Wednesday, 2024-10-02 11:30 AM",
//     gmeetLink:
//       "https://calendly.com/events/uvw-xyz-123-456-789abcdefghij/google_meet",
//     professorEmail: "sarah.patel@codecraft.co.in",
//     name: "Dr. Sarah Patel",
//     email: "student3@gmail.com",
//     department: "Physics",
//   },
//   {
//     startTime: "Thursday, 2024-10-03 15:00 PM",
//     endTime: "Thursday, 2024-10-03 15:30 PM",
//     gmeetLink:
//       "https://calendly.com/events/987-654-321-zyx-wvutsrqponmlk/google_meet",
//     professorEmail: "david.nguyen@codecraft.co.in",
//     name: "Prof. David Nguyen",
//     email: "student4@gmail.com",
//     department: "History",
//   },
// ];

export default async function MyAppointmentsPage() {
  const appointments = await getUserAppointments();
  console.log("Appointments", appointments);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-800">
        My Appointments
      </h1>
      <AppointmentsCard appointments={appointments!} />
    </div>
  );
}
