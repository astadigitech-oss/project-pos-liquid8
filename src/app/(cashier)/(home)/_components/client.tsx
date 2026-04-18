"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { CalendarDaysIcon, Clock7Icon } from "lucide-react";
import React from "react";
import { useTime } from "@/hooks/use-time";
import { ShiftDialog } from "./_dialog/shift";
import { CurrentCart } from "./_section/current-cart";
import { SummaryCart } from "./_section/summary-cart";
import { ButtonShift } from "./button-shift";

export const HomeClient = () => {
  const { formattedDate, formattedTime } = useTime();

  return (
    <div className="grid grid-cols-5 gap-4">
      <ShiftDialog />
      <div className="col-span-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger
                className={
                  "rounded-full size-10 bg-white hover:border-gray-300 hover:bg-white shadow"
                }
              />
              <div className="h-10 px-1.5 bg-white rounded-full flex items-center text-sm gap-2 shadow">
                <div className="size-7 bg-sky-100/60 text-sky-600 flex items-center justify-center rounded-full">
                  <CalendarDaysIcon className="size-3.5" />
                </div>
                <p className="pr-2 tabular-nums whitespace-nowrap">
                  {formattedDate}
                </p>
              </div>
              <div className="flex items-center">
                <p>–</p>
              </div>
              <div className="h-10 px-1.5 bg-white rounded-full flex items-center text-sm gap-2 shadow">
                <div className="size-7 bg-sky-100/60 text-sky-600 flex items-center justify-center rounded-full">
                  <Clock7Icon className="size-3.5" />
                </div>
                <p className="pr-2 tabular-nums whitespace-nowrap">
                  {formattedTime}
                </p>
              </div>
            </div>
            <ButtonShift />
          </div>
          <div className="h-[calc(100svh-32px-40px-16px)] w-full bg-white rounded-xl">
            <CurrentCart />
          </div>
        </div>
      </div>
      <div className="col-span-2 w-full">
        <div className="bg-white w-full h-[calc(100svh-32px)] rounded-xl shadow">
          <SummaryCart />
        </div>
      </div>
    </div>
  );
};
