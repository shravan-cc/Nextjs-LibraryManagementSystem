import DeleteMember from "@/components/admin/members/deletemember";
import Pagination from "@/components/home/pagination";
import SearchBar from "@/components/home/search";
import { Button } from "@/components/ui/button";
import { fetchMembers } from "@/lib/action";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Members({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query: string = searchParams?.query || "";
  const currentPage = searchParams!.page || 1;
  const limit = 5;
  const offset = (Number(currentPage) - 1) * limit;
  // const userDetails = await fetchMembers("", 10, 0);
  // const totalMembers = userDetails!.pagination.total;
  const memberDetails = await fetchMembers(query, limit, offset);
  const members = memberDetails!.items;
  const totalMembers = memberDetails!.pagination.total;
  const totalPages = Math.ceil(totalMembers / limit);
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-orange-800">Members</h2>
          <Link href="/home/members/addMember">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </Link>
        </div>
        <SearchBar type="Members" />
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {`${member.firstName} ${member.lastName}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs hover:bg-orange-100"
                    >
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button> */}
                    <DeleteMember member={member} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={Number(currentPage)} totalPages={totalPages} />
      </div>
    </>
  );
}
