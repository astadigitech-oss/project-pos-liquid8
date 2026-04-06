import React from "react";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  CalendarDays,
  LogOut,
  ScanBarcode,
  Settings,
  ShoppingBasket,
} from "lucide-react";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-row gap-2 p-4 border-b">
        <SidebarMenuButton className="h-10 border border-gray-300 rounded-full px-1">
          <Avatar>
            <AvatarFallback>AF</AvatarFallback>
            <AvatarImage alt="image" src={"https://github.com/shadcn.png"} />
          </Avatar>
        </SidebarMenuButton>
        <SidebarTrigger
          className={"size-10 rounded-full flex-none"}
          variant={"outline"}
        />
      </SidebarHeader>
      <div className="h-full flex items-center w-full">
        <SidebarGroup>
          <SidebarMenuButton className="h-12 text-base">
            <ScanBarcode className="size-4.5" />
            Kasir
          </SidebarMenuButton>
          <SidebarMenuButton className="h-12 text-base">
            <ShoppingBasket className="size-4.5" />
            Riwayat Transaksi
          </SidebarMenuButton>
          <SidebarMenuButton className="h-12 text-base">
            <CalendarDays className="size-4.5" />
            Manajemen Shift
          </SidebarMenuButton>
          <SidebarMenuButton className="h-12 text-base">
            <Settings className="size-4.5" />
            Pengaturan
          </SidebarMenuButton>
        </SidebarGroup>
      </div>
      <SidebarFooter className="border-t">
        <SidebarMenuButton className="h-10 text-sm text-red-500 hover:bg-red-100 hover:text-red-500">
          <LogOut className="size-4.5" />
          Keluar
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};
