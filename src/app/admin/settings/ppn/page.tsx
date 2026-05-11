import React from "react";
import { PpnSettingClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaturan PPN",
};

const PpnSettingPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");

  return <PpnSettingClient />;
};

export default PpnSettingPage;
