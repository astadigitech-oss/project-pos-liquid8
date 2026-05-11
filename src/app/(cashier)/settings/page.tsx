import React from "react";
import { SettingsClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaturan",
};

const SettingsPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && (auth.role === "admin" || auth.role === "superadmin"))
    redirect("/admin");

  return (
    <div className="p-4">
      <SettingsClient />
    </div>
  );
};

export default SettingsPage;
