import { NavAdmin } from "@/components/nav-admin";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-5xl xl:max-w-7xl px-8 mx-auto bg-gray-100 py-4 flex flex-col gap-4">
      <NavAdmin />
      {children}
    </div>
  );
};

export default AdminLayout;
