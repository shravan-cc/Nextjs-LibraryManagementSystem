import AppointmentsCard from "@/components/user/appointmentscard";
import { getProfessorByEmail, getUserAppointments } from "@/lib/action";

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
