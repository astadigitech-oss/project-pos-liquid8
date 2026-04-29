import React from "react";
import { PpnSettingClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";

const PpnSettingPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");

  return <PpnSettingClient />;
};

export default PpnSettingPage;
