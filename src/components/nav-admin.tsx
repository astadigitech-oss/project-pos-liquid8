"use client";

import {
  Banknote,
  ChartColumn,
  LayoutGrid,
  LogOut,
  Settings,
  Store,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AtomValue } from "@suspensive/jotai";
import { logoutAtom } from "./sidebar/_api/mutations";
import { deleteCookie } from "cookies-next/client";
import { secretStore } from "@/config";

export const NavAdmin = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="bg-white border shadow-md h-14 rounded-xl w-full px-4 flex items-center">
      <div className="flex items-center gap-8">
        <div className="text-sm font-semibold px-2 py-0.5 bg-red-600 rounded-md flex text-white items-center gap-1">
          <LayoutGrid className="size-3.5" />
          ADMIN POS
        </div>
        <div className="flex items-center gap-1">
          <Link href={"/admin"}>
            <Button
              variant={"ghost"}
              data-active={pathname === "/admin"}
              className={"hover:bg-red-100 data-[active=true]:bg-red-200"}
              size={"sm"}
            >
              <ChartColumn className="size-3.5" />
              Dashboard
            </Button>
          </Link>
          <Link href={"/admin/transactions"}>
            <Button
              variant={"ghost"}
              data-active={pathname.includes("/admin/transactions")}
              className={"hover:bg-red-100 data-[active=true]:bg-red-200"}
              size={"sm"}
            >
              <Banknote className="size-3.5" />
              Transaksi
            </Button>
          </Link>
          <Button
            variant={"ghost"}
            className={"hover:bg-red-100 data-[active=true]:bg-red-200"}
            size={"sm"}
          >
            <Store className="size-3.5" />
            Store
          </Button>
          <Link href={"/admin/settings"}>
            <Button
              variant={"ghost"}
              data-active={pathname.includes("/admin/settings")}
              className={"hover:bg-red-100 data-[active=true]:bg-red-200"}
              size={"sm"}
            >
              <Settings className="size-3.5" />
              Pengaturan
            </Button>
          </Link>
        </div>
      </div>
      <AtomValue atom={logoutAtom}>
        {({ mutate }) => (
          <Button
            variant={"destructive"}
            className={"ml-auto"}
            onClick={() =>
              mutate(undefined, {
                onSuccess: () => {
                  deleteCookie(secretStore);
                  router.push("/login");
                },
              })
            }
          >
            Keluar
            <LogOut className="size-3.5" />
          </Button>
        )}
      </AtomValue>
    </div>
  );
};
