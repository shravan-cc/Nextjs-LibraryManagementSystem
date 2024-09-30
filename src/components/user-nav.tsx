"use client";

import {
  BookIcon,
  Calendar,
  FileText,
  GraduationCap,
  LayoutDashboard,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { UserInfo } from "os";
import { UserNavigationProps } from "@/lib/definition";

export default function UserNavigation({ closeSheet }: UserNavigationProps) {
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState("dashboard");
  const t = useTranslations("SideBar");

  useEffect(() => {
    if (pathName === "/user") {
      setActiveTab("dashboard");
    } else if (pathName.startsWith("/user/books")) {
      setActiveTab("books");
    } else if (pathName.startsWith("/user/MyBooks")) {
      setActiveTab("MyBooks");
    } else if (pathName.startsWith("/user/requests")) {
      setActiveTab("requests");
    } else if (pathName.startsWith("/user/professors")) {
      setActiveTab("professors");
    } else if (pathName.startsWith("/user/appointments")) {
      setActiveTab("appointments");
    }
  }, [pathName]);

  const NavItem = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => {
    const path = value === "dashboard" ? "/user" : `/user/${value}`;
    const isActive =
      value === "dashboard"
        ? activeTab === value && pathName === path
        : activeTab === value && pathName.startsWith(path);

    return (
      <Link href={path}>
        <Button
          variant={activeTab === value ? "default" : "ghost"}
          className={`w-full justify-start transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-orange-500 to-CustomOrange text-white hover:from-orange-600 hover:to-CustomDarkOrange"
              : "hover:bg-orange-100 bg-transparent text-gray-700 hover:text-CustomOrange"
          }`}
          onClick={() => {
            setActiveTab(value);
            if (closeSheet) closeSheet();
          }}
        >
          {icon}
          <span className="ml-2">{label}</span>
        </Button>
      </Link>
    );
  };

  return (
    <>
      <NavItem
        icon={<LayoutDashboard className="h-5 w-5" />}
        label={t("Dashboard")}
        value="dashboard"
      />
      <NavItem
        icon={<BookIcon className="h-5 w-5" />}
        label={t("Books")}
        value="books"
      />
      <NavItem
        icon={<UsersIcon className="h-5 w-5" />}
        label={t("My Books")}
        value="MyBooks"
      />
      <NavItem
        icon={<FileText className="h-5 w-5" />}
        label={t("Requests")}
        value="requests"
      />
      <NavItem
        icon={<GraduationCap className="h-5 w-5" />}
        label="Professors"
        value="professors"
      />
      <NavItem
        icon={<Calendar className="h-5 w-5" />}
        label="Appointments"
        value="appointments"
      />
    </>
  );
}
