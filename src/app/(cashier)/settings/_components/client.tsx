"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTime } from "@/hooks/use-time";
import React from "react";
import { ProfileSetting } from "./_section/profile";
import { PasswordSetting } from "./_section/password";

export const SettingsClient = () => {
  const { formattedDate, formattedTime } = useTime();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-4 justify-between py-2 px-5">
        <div className="flex items-center gap-2">
          <SidebarTrigger
            className={
              "rounded-lg size-10 bg-white hover:border-gray-300 hover:bg-white shadow"
            }
          />
          <h1 className="font-medium text-xl">Pengaturan</h1>
        </div>
        <div>
          <div className="flex items-center h-10 tabular-nums rounded-full px-5 bg-white shadow text-xs gap-2">
            <p>{formattedDate}</p>
            <p>|</p>
            <p>{formattedTime}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 flex flex-col w-full rounded-xl gap-4">
        <ProfileSetting />
        <Separator />
        <PasswordSetting />
      </div>
    </div>
  );
};
