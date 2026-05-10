import React from "react";
import { TransactionAdminClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaksi",
};

const TransactionAdminPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");
  return <TransactionAdminClient />;
};

export default TransactionAdminPage;
