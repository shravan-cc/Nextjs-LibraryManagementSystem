import ApproveTransaction from "@/components/admin/transactions/approveTransaction";
import CheckDueToday from "@/components/admin/transactions/dueToday";
import FilterTransactionByStatus from "@/components/admin/transactions/filterTransaction";
import RejectTransaction from "@/components/admin/transactions/rejectTransaction";
import Pagination from "@/components/home/pagination";
import SearchBar from "@/components/home/search";
import { Badge } from "@/components/ui/badge";
import ReturnBook from "@/components/user/returnBook";
import { fetchTransactionDetails } from "@/lib/action";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

export default async function Transactions({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    status?: string;
    duedate?: string;
  };
}) {
  const query: string = searchParams?.query || "";
  const status: string = searchParams?.status || "";
  const currentPage = searchParams!.page || 1;
  const dueToday = searchParams?.duedate;
  const limit = 5;
  const offset = (Number(currentPage) - 1) * limit;
  const fetchedTransactions = await fetchTransactionDetails(
    query,
    limit,
    offset,
    status,
    dueToday
  );
  const transactions = fetchedTransactions!.items;
  const totalTransactions = fetchedTransactions!.pagination.total;
  const totalPages = Math.ceil(totalTransactions / limit);

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-orange-800">Transactions</h2>
        <div className="flex justify-between items-center">
          <SearchBar type="Transactions" />
          <div className="flex space-x-4">
            <FilterTransactionByStatus />
            <CheckDueToday />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader className="bg-orange-50">
              <TableRow>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  ID
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Book ID
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Member ID
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Book Title
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Member Name
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Borrow Date
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Due Date
                </TableHead>
                <TableHead className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors">
                  Returned Date
                </TableHead>
                <TableHead className="font-semibold text-orange-700 text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="bg-white transition-colors"
                >
                  <TableCell className="font-medium text-right">
                    {transaction.id}
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.bookId}
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.memberId}
                  </TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{`${transaction.firstName} ${transaction.lastName}`}</TableCell>
                  <TableCell>{transaction.borrowDate}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{transaction.dueDate}</TableCell>
                  <TableCell>
                    {transaction.returnDate || "Not returned"}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      {transaction.status === "pending" && (
                        <ApproveTransaction transaction={transaction} />
                      )}

                      {transaction.status === "pending" && (
                        <RejectTransaction transaction={transaction} />
                      )}

                      {transaction.status === "approved" && (
                        <ReturnBook
                          bookId={transaction.bookId}
                          memberId={transaction.memberId}
                          status={transaction.status}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {transactions.length === 0 && (
          <p className="text-center text-CustomDarkOrange mt-4">
            No Transactions found.
          </p>
        )}
        <Pagination currentPage={Number(currentPage)} totalPages={totalPages} />
      </div>
    </>
  );
}
