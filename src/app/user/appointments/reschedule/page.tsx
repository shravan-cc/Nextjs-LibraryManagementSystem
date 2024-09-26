import Calendly from "@/components/calendlyDirector";
import { fetchUserDetails, getProfessorById } from "@/lib/action";

export default async function CalendlyPage({
  searchParams,
}: {
  searchParams: { url: string };
}) {
  return <Calendly calendlyURL={searchParams.url} />;
}
