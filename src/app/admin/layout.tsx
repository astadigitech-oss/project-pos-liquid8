import { Button } from "@/components/ui/button";
import {
  Banknote,
  CalendarDays,
  ChartColumn,
  LayoutGrid,
  LogInIcon,
  Settings,
} from "lucide-react";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-5xl xl:max-w-7xl px-8 mx-auto bg-gray-100 py-4 flex flex-col gap-4">
      <div className="bg-white border shadow-md h-14 rounded-xl w-full px-4 flex items-center">
        <div className="flex items-center gap-8">
          <div className="text-sm font-semibold px-2 py-0.5 bg-red-200 rounded-md flex items-center gap-1">
            <LayoutGrid className="size-3.5" />
            ADMIN POS
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={"ghost"}
              className={"hover:bg-red-100"}
              size={"sm"}
            >
              <ChartColumn className="size-3.5" />
              Dashboard
            </Button>
            <Button
              variant={"ghost"}
              className={"hover:bg-red-100"}
              size={"sm"}
            >
              <Banknote className="size-3.5" />
              Transaksi
            </Button>
            <Button
              variant={"ghost"}
              className={"hover:bg-red-100"}
              size={"sm"}
            >
              <CalendarDays className="size-3.5" />
              Shift
            </Button>
            <Button
              variant={"ghost"}
              className={"hover:bg-red-100"}
              size={"sm"}
            >
              <Settings className="size-3.5" />
              Pengaturan
            </Button>
          </div>
        </div>
        <Button variant={"diskonter"} className={"ml-auto"}>
          <LogInIcon className="size-3.5" />
          Masuk
        </Button>
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
