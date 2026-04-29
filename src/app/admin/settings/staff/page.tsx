import React from "react";
import { StaffSettingClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";

const StaffSettingPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");
  return <StaffSettingClient />;
};

export default StaffSettingPage;
