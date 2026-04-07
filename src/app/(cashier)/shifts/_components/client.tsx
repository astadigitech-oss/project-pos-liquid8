"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScanBarcode, SidebarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const ShiftsClient = () => {
  return (
    <div className="flex items-center gap-2">
      <SidebarTrigger
        size={"default"}
        render={
          <Button
            variant={"outline"}
            className={"rounded-full! px-5! shadow! h-10!"}
          >
            <SidebarIcon />
            Sidebar
          </Button>
        }
      />
      <Link href={"/"}>
        <Button className={"h-10 rounded-full px-5"}>
          <ScanBarcode />
          Kembali ke kasir
        </Button>
      </Link>
    </div>
  );
};
