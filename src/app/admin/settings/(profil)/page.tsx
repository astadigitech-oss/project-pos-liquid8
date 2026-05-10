import React from "react";
import { SettingsAdminClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaturan Admin",
};

const SettingsAdminPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");

  return (
    <div>
      <SettingsAdminClient />
    </div>
  );
};

export default SettingsAdminPage;
