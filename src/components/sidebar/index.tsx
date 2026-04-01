import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
    </Sidebar>
  );
};
