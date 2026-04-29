"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import { ProfileSetting } from "./_section/profile";
import { PasswordSetting } from "./_section/password";

export const SettingsAdminClient = () => {
  return (
    <div className="bg-white border shadow rounded-xl p-4 flex flex-col gap-4">
      <ProfileSetting />
      <Separator />
      <PasswordSetting />
    </div>
  );
};
