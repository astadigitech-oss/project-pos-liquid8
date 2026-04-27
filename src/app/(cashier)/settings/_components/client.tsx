"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTime } from "@/hooks/use-time";
import React from "react";
import { ProfileSetting } from "./_section/profile";
import { PasswordSetting } from "./_section/password";
import { useOS } from "@/hooks/use-os";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { baseUrl } from "@/config";

export const SettingsClient = () => {
  const { formattedDate, formattedTime } = useTime();
  const { isLoaded, os } = useOS();

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
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <p className="font-semibold h-7 flex items-center relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-red-400 before:rounded-full">
            Printer Driver
          </p>
          {isLoaded && os === "Windows" && (
            <div>
              <p>Rekomendasi:</p>
              <div className="flex items-center gap-2">
                <Link href={`${baseUrl}/apps/win/latest.exe`}>
                  <Button>Windows App</Button>
                </Link>
                <Link href={`${baseUrl}/apps/win/zadig.exe`}>
                  <Button>Zadig App</Button>
                </Link>
              </div>
            </div>
          )}
          {isLoaded && os === "MacOS" && (
            <div>
              <p>Rekomendasi:</p>
              <Link href={`${baseUrl}/apps/mac/latest.dmg`}>
                <Button>Mac App</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
