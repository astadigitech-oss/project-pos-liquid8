import { Construction, HammerIcon, WrenchIcon } from "lucide-react";
import React from "react";
import { SettingsClient } from "./_components/client";

const SettingsPage = () => {
  return (
    <div className="size-full flex items-center justify-center flex-col gap-4">
      <div className="size-24 flex items-center justify-center rounded-full border shadow-md border-gray-300">
        <Construction className="size-12" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xl font-semibold">Halaman Pengaturan</p>
        <div className="bg-amber-200 px-3 rounded-lg flex items-center gap-2">
          <HammerIcon className="size-4" />
          <p className="text-lg">Dalam Pengembangan</p>
          <WrenchIcon className="size-4" />
        </div>
      </div>
      <SettingsClient />
    </div>
  );
};

export default SettingsPage;
