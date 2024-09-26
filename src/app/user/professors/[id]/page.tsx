import Calendly from "@/components/calendlyDirector";
import { fetchUserDetails, getProfessorById } from "@/lib/action";

export default async function CalendlyPage({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { name?: string; email?: string };
}) {
  const professor = await getProfessorById(params.id);
  const calendlyURL = new URL(professor!.calendlylink);

  if (searchParams.name) {
    calendlyURL.searchParams.set("name", searchParams.name); 
  }
  if (searchParams.email) {
    calendlyURL.searchParams.set("email", searchParams.email);
  }

  return <Calendly calendlyURL={calendlyURL.toString()} />;
}
