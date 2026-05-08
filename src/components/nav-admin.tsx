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
import { userInfoAtom } from "@/app/(cashier)/settings/_api/queries";
import { Spinner } from "./ui/spinner";

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
          <Link href={"/admin/store"}>
            <Button
              variant={"ghost"}
              className={"hover:bg-red-100 data-[active=true]:bg-red-200"}
              size={"sm"}
            >
              <Store className="size-3.5" />
              Toko
            </Button>
          </Link>
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
      <div className={"ml-auto flex items-center gap-6 border p-1 rounded-xl"}>
        <AtomValue atom={userInfoAtom}>
          {({ data }) => (
            <div className="flex items-center">
              <div className="border rounded-lg px-1 ml-1 flex justify-center bg-gray-200">
                <p className="font-semibold text-xs capitalize">
                  {data?.resource.role}
                </p>
              </div>
              <p className="font-semibold text-sm pl-1 capitalize">
                {data?.resource.name}
              </p>
            </div>
          )}
        </AtomValue>
        <AtomValue atom={logoutAtom}>
          {({ mutate, isPending: isLoggingOut }) => (
            <Button
              variant={"destructive"}
              size={"icon-sm"}
              disabled={isLoggingOut}
              onClick={() =>
                mutate(undefined, {
                  onSuccess: () => {
                    deleteCookie(secretStore);
                    router.push("/login");
                  },
                })
              }
            >
              {isLoggingOut ? (
                <Spinner className="size-3.5" />
              ) : (
                <LogOut className="size-3.5" />
              )}
            </Button>
          )}
        </AtomValue>
      </div>
    </div>
  );
};
