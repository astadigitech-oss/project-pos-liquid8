import React from "react";
import { InventoriesClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventori",
};

const InventorieAdminPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");

  return <InventoriesClient />;
};

export default InventorieAdminPage;
