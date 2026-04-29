"use client";

import { Button } from "@/components/ui/button";
import { IdCard, Landmark, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const SidebarSetting = () => {
  const pathname = usePathname();
  return (
    <div className="bg-white border shadow rounded-xl p-2 pt-4 flex flex-col gap-4">
      <h1 className="font-medium px-2">Pengaturan</h1>
      <div className="flex gap-1 flex-col">
        <Link href={"/admin/settings"}>
          <Button
            variant={"ghost"}
            data-active={pathname === "/admin/settings"}
            className={
              "hover:bg-red-100 data-[active=true]:bg-red-200 justify-start w-full flex-auto text-xs"
            }
          >
            <IdCard />
            Data Pribadi
          </Button>
        </Link>
        <Link href={"/admin/settings/ppn"}>
          <Button
            variant={"ghost"}
            data-active={pathname === "/admin/settings/ppn"}
            className={
              "hover:bg-red-100 data-[active=true]:bg-red-200 justify-start w-full flex-auto text-xs"
            }
          >
            <Landmark />
            PPN
          </Button>
        </Link>
        <Link href={"/admin/settings/staff"}>
          <Button
            variant={"ghost"}
            data-active={pathname === "/admin/settings/staff"}
            className={
              "hover:bg-red-100 data-[active=true]:bg-red-200 justify-start w-full flex-auto text-xs"
            }
          >
            <Users2 />
            Staff
          </Button>
        </Link>
      </div>
    </div>
  );
};
