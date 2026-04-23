"use client";

import React from "react";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  CalendarDays,
  LogOut,
  Maximize2,
  Minimize2,
  ScanBarcode,
  Settings,
  ShoppingBasket,
  StoreIcon,
  User2,
} from "lucide-react";
import { Button } from "../ui/button";
import { TooltipText } from "@/providers/tooltip-provider";
import { useFullscreenToggle } from "@/hooks/use-fullscreen";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AtomValue } from "@suspensive/jotai";
import { userInfoAtom } from "@/app/(cashier)/settings/_api/queries";
import { logoutAtom } from "./_api/mutations";
import { deleteCookie } from "cookies-next/client";
import { secretStore } from "@/config";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { toggleFullscreen, isFullscreen } = useFullscreenToggle();
  const { setOpen } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AtomValue atom={userInfoAtom}>
      {({ data }) => (
        <Sidebar {...props}>
          <SidebarHeader className="flex flex-row gap-2 p-4 border-b items-center">
            <div className="flex items-center w-full h-10 border border-gray-300 rounded-full px-1 gap-2">
              <div className="size-8 flex items-center justify-center border rounded-full border-red-500 bg-red-500 text-white">
                <StoreIcon className="size-4" />
              </div>
              <p className="font-semibold">{data?.resource.store_name}</p>
            </div>
            <TooltipText
              value={
                <div className="flex items-center gap-1">
                  <p>{isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}</p>
                  <p className="size-4 rounded text-[10px] flex items-center justify-center border">
                    F
                  </p>
                </div>
              }
              render={
                <Button
                  onClick={toggleFullscreen}
                  type="button"
                  variant={"outline"}
                  size={"icon"}
                  className={"size-10 rounded-full"}
                >
                  {isFullscreen ? <Minimize2 /> : <Maximize2 />}
                </Button>
              }
            />
            <SidebarTrigger
              className={"size-10 rounded-full flex-none"}
              variant={"outline"}
            />
          </SidebarHeader>
          <div className="h-full flex items-center w-full">
            <SidebarGroup>
              <Link href={"/"}>
                <SidebarMenuButton
                  isActive={pathname === "/"}
                  className="h-12 text-base"
                  onClick={() => setOpen(false)}
                >
                  <ScanBarcode className="size-4.5" />
                  Kasir
                </SidebarMenuButton>
              </Link>
              <Link href={"/transactions"}>
                <SidebarMenuButton
                  isActive={pathname === "/transactions"}
                  className="h-12 text-base"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingBasket className="size-4.5" />
                  Riwayat Transaksi
                </SidebarMenuButton>
              </Link>
              <Link href={"/shifts"}>
                <SidebarMenuButton
                  isActive={pathname === "/shifts"}
                  className="h-12 text-base"
                  onClick={() => setOpen(false)}
                >
                  <CalendarDays className="size-4.5" />
                  Manajemen Shift
                </SidebarMenuButton>
              </Link>
              <Link href={"/settings"}>
                <SidebarMenuButton
                  isActive={pathname === "/settings"}
                  className="h-12 text-base"
                  onClick={() => setOpen(false)}
                >
                  <Settings className="size-4.5" />
                  Pengaturan
                </SidebarMenuButton>
              </Link>
            </SidebarGroup>
          </div>
          <SidebarFooter className="border-t gap-1 py-5 px-2">
            <div className="flex items-center p-1 gap-2 border rounded-lg">
              <div className="size-7 flex items-center justify-center border rounded-md border-red-500 bg-red-500 text-white ml-1">
                <User2 className="size-4" />
              </div>
              <p>{data?.resource.name}</p>
              <AtomValue atom={logoutAtom}>
                {({ mutate }) => (
                  <TooltipText
                    value="Keluar"
                    side="left"
                    sideOffset={10}
                    render={
                      <Button
                        size={"icon"}
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
                        <LogOut className="size-3.5" />
                      </Button>
                    }
                  />
                )}
              </AtomValue>
            </div>
          </SidebarFooter>
        </Sidebar>
      )}
    </AtomValue>
  );
};
