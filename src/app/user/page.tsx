import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  fetchBooks,
  fetchMembers,
  fetchTotalBooksOfMember,
} from "@/lib/action";
import { Activity, BarChart, BookOpen, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Dashboard() {
  const t = await getTranslations("Dashboard");
  const books = await fetchBooks("", 10, 0);
  const totalBooks = books!.pagination.total;
  const members = await fetchMembers("", 10, 0);
  const totalMembers = members?.pagination.total;
  const totalBorrowedBooks = await fetchTotalBooksOfMember();
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-orange-800">{t("Dashboard")}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Total Books")}
              </CardTitle>
              <BookOpen className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBooks}</div>
              <p className="text-xs text-muted-foreground">
                {t("+20 from last month")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Active Members")}
              </CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">
                {t("+7 new members this week")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Books Borrowed")}
              </CardTitle>
              <BarChart className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalBorrowedBooks!.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {t("+180 from last month")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Late Returns")}
              </CardTitle>
              <Activity className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2</div>
              <p className="text-xs text-muted-foreground">
                {t("+2 from last month")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
