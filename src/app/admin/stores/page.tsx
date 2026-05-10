import React from "react";
import { StoreAdminClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toko",
};

const StoreAdminPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");
  return <StoreAdminClient />;
};

export default StoreAdminPage;
