import DeleteMember from "@/components/admin/members/deletemember";
import Pagination from "@/components/home/pagination";
import SearchBar from "@/components/home/search";
import { Button } from "@/components/ui/button";
import { fetchMembers } from "@/lib/action";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

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
        <h2 className="text-2xl font-bold text-orange-800">Members</h2>
        <div className="flex justify-between items-center">
          <SearchBar type="Members" />
          <Link href="/home/members/addMember">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader className="bg-orange-50">
              <TableRow>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  ID
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Phone Number
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Address
                </TableHead>
                <TableHead className="font-semibold text-orange-700 text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow
                  key={member.id}
                  className="bg-white transition-colors"
                >
                  <TableCell className="font-medium text-center">
                    {member.id}
                  </TableCell>
                  <TableCell>{`${member.firstName} ${member.lastName}`}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.address}</TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      {/* <Button
                        variant="outline"
                        size="sm"
                        className="text-xs bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-600 transition-colors"
                      >
                        <Edit className="h-3 w-3 mr-1" /> Edit
                      </Button> */}
                      <DeleteMember member={member} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {members!.length === 0 && (
          <p className="text-center text-CustomDarkOrange mt-4">
            No members found.
          </p>
        )}
        <Pagination currentPage={Number(currentPage)} totalPages={totalPages} />
      </div>
    </>
  );
}
