import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="w-full max-w-5xl xl:max-w-7xl px-8 mx-auto bg-gray-100">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default HomeLayout;
