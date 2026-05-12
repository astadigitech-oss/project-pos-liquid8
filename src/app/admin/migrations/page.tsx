import React from "react";
import { MigrationsClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Migrasi",
};

const MigrationAdminPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");

  return <MigrationsClient />;
};

export default MigrationAdminPage;
