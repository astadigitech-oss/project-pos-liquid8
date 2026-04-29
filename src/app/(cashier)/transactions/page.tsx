import React from "react";
import { TransactionClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";

const TransactionPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "admin") redirect("/admin");

  return (
    <div className="p-4">
      <TransactionClient />
    </div>
  );
};

export default TransactionPage;
