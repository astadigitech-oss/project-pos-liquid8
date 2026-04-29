import React from "react";
import { SidebarSetting } from "./(profil)/_components/sidebar";

const SettingAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div>
        <SidebarSetting />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default SettingAdminLayout;
