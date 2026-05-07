import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  CalendarDaysIcon,
  ClipboardClock,
  Clock7Icon,
  User2,
} from "lucide-react";
import { useTime } from "@/hooks/use-time";
import { Button } from "@/components/ui/button";
import { TooltipText } from "@/providers/tooltip-provider";
import { ButtonShift } from "./button-shift";
import { CustomerDialog } from "../left/_dialog/customer";
import { AtomValue, SetAtom } from "@suspensive/jotai";
import { cashierDialog, customerSelectedId } from "../../_api/atoms";
import { detailSelectedMemberAtom } from "../../_api/queries";
import { ShiftDialog } from "./_dialog/shift";

export const TopSection = () => {
  const { formattedDate, formattedTime } = useTime();
  return (
    <div className="flex items-center justify-between gap-4">
      <ShiftDialog />
      <CustomerDialog />
      <div className="flex items-center gap-3">
        <SidebarTrigger
          className={
            "rounded-full size-10 bg-white hover:border-gray-300 hover:bg-white shadow"
          }
        />
        <div className="h-10 px-1.5 bg-white rounded-full flex items-center text-sm gap-2 shadow">
          <div className="size-7 bg-red-100/60 text-red-600 flex items-center justify-center rounded-full">
            <CalendarDaysIcon className="size-3.5" />
          </div>
          <p className="pr-2 tabular-nums whitespace-nowrap">{formattedDate}</p>
        </div>
        <div className="h-10 px-1.5 bg-white rounded-full flex items-center text-sm gap-2 shadow">
          <div className="size-7 bg-red-100/60 text-red-600 flex items-center justify-center rounded-full">
            <Clock7Icon className="size-3.5" />
          </div>
          <p className="pr-2 tabular-nums whitespace-nowrap">{formattedTime}</p>
        </div>
        <ButtonShift />
      </div>
      <SetAtom atom={cashierDialog}>
        {(setOpen) => (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className={
                "rounded-full h-10 p-1.5 hover:bg-white border-white hover:border-gray-200 shadow"
              }
              onClick={() => setOpen("customer-list")}
            >
              <AtomValue atom={detailSelectedMemberAtom}>
                {({ data }) => (
                  <AtomValue atom={customerSelectedId}>
                    {(customerId) => (
                      <p className="text-xs pl-1 pr-2">
                        {customerId && data?.resource.name
                          ? data?.resource.name
                          : "Pilih Customer"}
                      </p>
                    )}
                  </AtomValue>
                )}
              </AtomValue>
              <div className="size-7 rounded-full bg-red-100 flex items-center justify-center">
                <User2 className="size-3.5 text-red-600" />
              </div>
            </Button>
            <TooltipText
              value="Draf Transaksi"
              align="end"
              sideOffset={10}
              render={
                <Button
                  variant="outline"
                  size={"icon-lg"}
                  onClick={() => setOpen("draft-list")}
                  className={
                    "rounded-full size-10 hover:bg-white border-white hover:border-gray-200 shadow text-red-600 hover:text-red-600"
                  }
                >
                  <ClipboardClock />
                </Button>
              }
            />
          </div>
        )}
      </SetAtom>
    </div>
  );
};
