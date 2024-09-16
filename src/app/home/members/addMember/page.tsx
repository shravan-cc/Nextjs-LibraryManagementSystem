import MemberForm from "@/components/admin/members/memberForm";

export default async function AddMember() {
  return (
    <>
      <div className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-800">Add Member</h2>
        <MemberForm />
      </div>
    </>
  );
}
