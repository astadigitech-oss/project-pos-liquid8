import React from "react";
import { MemberClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Migrasi",
};

const MemberAdminPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");

  return <MemberClient />;
};

export default MemberAdminPage;
