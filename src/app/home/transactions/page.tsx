import FilterGenre from "@/components/admin/books/filterGenre";
import ApproveTransaction from "@/components/admin/transactions/approveTransaction";
import FilterTransactionByStatus from "@/components/admin/transactions/filterTransaction";
import RejectTransaction from "@/components/admin/transactions/rejectTransaction";
import Pagination from "@/components/home/pagination";
import SearchBar from "@/components/home/search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReturnBook from "@/components/user/returnBook";
import {
  approveTransaction,
  fetchTransactionDetails,
  rejectTransaction,
} from "@/lib/action";
import { CheckCircle, Plus, XCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Transactions({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; status?: string };
}) {
  const query: string = searchParams?.query || "";
  const status: string = searchParams?.status || "";
  const currentPage = searchParams!.page || 1;
  const limit = 5;
  const offset = (Number(currentPage) - 1) * limit;
  const fetchedTransactions = await fetchTransactionDetails(
    query,
    limit,
    offset,
    status
  );
  const transactions = fetchedTransactions!.items;
  const totalTransactions = fetchedTransactions!.pagination.total;
  const totalPages = Math.ceil(totalTransactions / limit);
  console.log(totalPages);
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-orange-800">Transactions</h2>
        </div>
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <SearchBar type="Transactions" />
          <FilterTransactionByStatus />
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrow Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Returned Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions!.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.bookId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.memberId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.borrowDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Badge
                      variant={
                        transaction.status === "approved"
                          ? "default"
                          : transaction.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.returnDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <ApproveTransaction transaction={transaction} />
                      <RejectTransaction transaction={transaction} />
                      <ReturnBook
                        bookId={transaction.bookId}
                        memberId={transaction.memberId}
                        status={transaction.status}
                      />
                    </div>
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
