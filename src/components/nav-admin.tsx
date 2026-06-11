"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next/client";
import { AtomValue } from "@suspensive/jotai";
import {
  ChartColumn,
  ClipboardClock,
  Landmark,
  LayoutGrid,
  LogOut,
  Menu,
  Package,
  Settings,
  Store,
  Truck,
  Users2,
} from "lucide-react";

import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

import { logoutAtom } from "./sidebar/_api/mutations";
import { userInfoAtom } from "@/app/(cashier)/settings/_api/queries";
import { secretStore } from "@/config";
import { cn } from "@/lib/utils"; // Opsional: jika pakai utility classnames

// Konfigurasi Menu agar mudah ditambah/kurangi
const MENU_ITEMS = [
  { href: "/admin/transactions", label: "Transaksi", icon: Landmark },
  { href: "/admin/stores", label: "Toko", icon: Store },
  { href: "/admin/shifts", label: "Shift", icon: ClipboardClock },
  { href: "/admin/members", label: "Member", icon: Users2 },
  { href: "/admin/migrations", label: "Migrasi", icon: Truck },
  { href: "/admin/inventories", label: "Inventory", icon: Package },
];

const navItemStyles =
  "hover:bg-red-100 data-active:bg-red-200 data-active:hover:bg-red-200 data-active:focus:bg-red-200 focus:bg-red-200 h-7 text-xs font-medium cursor-default border border-white transition-colors";

export const NavAdmin = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Mencari label aktif untuk ditampilkan di samping text "Menu"
  const activeSubLabel = useMemo(() => {
    return MENU_ITEMS.find((item) => pathname.includes(item.href))?.label;
  }, [pathname]);

  const handleLogout = (mutate: any) => {
    mutate(undefined, {
      onSuccess: () => {
        deleteCookie(secretStore);
        router.replace("/login");
      },
    });
  };

  return (
    <nav className="bg-white border shadow-md h-14 rounded-xl w-full px-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        {/* Brand/Logo */}
        <div className="text-sm font-semibold px-2 py-0.5 bg-red-600 rounded-md flex text-white items-center gap-1 shrink-0">
          <LayoutGrid className="size-3.5" />
          ADMIN POS
        </div>

        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {/* Dashboard Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                active={pathname === "/admin"}
                className={navItemStyles}
                render={
                  <Link href="/admin">
                    <ChartColumn className="size-3.5" />
                    Dashboard
                  </Link>
                }
              />
            </NavigationMenuItem>

            {/* Dropdown Menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                data-active={!!activeSubLabel}
                className={cn(
                  navItemStyles,
                  "data-popup-open:bg-red-100 data-popup-open:data-[active=true]:bg-red-200 data-popup-open:data-[active=true]:hover:bg-red-200 data-popup-open:hover:bg-red-100 data-[active=true]:hover:bg-red-200 flex items-center gap-2",
                )}
              >
                <Menu className="size-3.5" />
                <span>Menu {activeSubLabel && `- ${activeSubLabel}`}</span>
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="w-28">
                  {MENU_ITEMS.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink
                        active={pathname.includes(item.href)}
                        className={navItemStyles}
                        render={
                          <Link href={item.href}>
                            <item.icon className="size-3.5" />
                            {item.label}
                          </Link>
                        }
                      />
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Settings Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                active={pathname.includes("/admin/settings")}
                className={navItemStyles}
                render={
                  <Link href="/admin/settings">
                    <Settings className="size-3.5" />
                    Pengaturan
                  </Link>
                }
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* User Info & Actions */}
      <div className="flex items-center gap-4 border p-1 rounded-xl bg-gray-50/50">
        <AtomValue atom={userInfoAtom}>
          {({ data }) => (
            <div className="flex items-center gap-2 px-1">
              <span className="border rounded-md px-1.5 py-0.5 bg-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                {data?.resource.role}
              </span>
              <p className="font-semibold text-xs capitalize max-w-30 truncate text-gray-700">
                {data?.resource.name}
              </p>
            </div>
          )}
        </AtomValue>

        <AtomValue atom={logoutAtom}>
          {({ mutate, isPending: isLoggingOut }) => (
            <Button
              variant="destructive"
              size="icon-sm"
              disabled={isLoggingOut}
              onClick={() => handleLogout(mutate)}
              title="Logout"
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
    </nav>
  );
};
