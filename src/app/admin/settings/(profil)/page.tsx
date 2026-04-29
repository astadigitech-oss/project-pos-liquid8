import React from "react";
import { SettingsAdminClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";

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
