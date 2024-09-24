import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scrollArea";
import CancelTransaction from "@/components/user/cancelrequest";
import { fetchBooksByMember } from "@/lib/action";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";

export default async function Requests() {
  const t = await getTranslations("MyRequests");
  const bookRequests = await fetchBooksByMember();
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-orange-800">
          {t("MyRequests")}
        </h2>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader className="bg-orange-50">
              <TableRow>
                <TableHead className="font-semibold text-orange-700">
                  {t("Title")}
                </TableHead>
                <TableHead className="font-semibold text-orange-700">
                  {t("Author")}
                </TableHead>
                <TableHead className="font-semibold text-orange-700">
                  {t("Status")}
                </TableHead>
                <TableHead className="font-semibold text-orange-700">
                  {t("Actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookRequests!.map((request) => (
                <TableRow
                  key={request.id}
                  className="hover:bg-white transition-colors"
                >
                  <TableCell className="font-medium">{request.title}</TableCell>
                  <TableCell>{request.author}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "approved"
                          ? "default"
                          : request.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        request.status === "approved"
                          ? "bg-green-100 text-green-800 "
                          : request.status === "rejected"
                          ? "bg-red-100 text-red-800 "
                          : "bg-orange-100 text-orange-800 "
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <CancelTransaction request={request} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {bookRequests!.length === 0 && (
          <p className="text-center text-CustomDarkOrange mt-4">
            {t("NoBooks")}
          </p>
        )}
      </div>
    </>
  );
}
